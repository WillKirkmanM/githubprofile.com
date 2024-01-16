import type { Repository } from "~/server/api/routers/user";
import { Card, Group, Text, Badge, ActionIcon, Divider } from "@mantine/core";
import colours from "../../data/colors.json";
import { IconBookmark, IconCircleDot, IconStar } from "@tabler/icons-react";
import { formatDistanceToNow, parseISO } from 'date-fns';
import { marked } from "marked"
import { useEffect, useState } from "react";
import Link from "next/link";

interface RepositoryCardProps {
  repository: Repository
}

type Colours = Record<string, { color: string }>;

export default function RepositoryCard({ repository }: RepositoryCardProps) {
  const [hasREADME, setHasREADME] = useState(false)
  const [mdREADME, setMDREADME] = useState('')

  const colour: string = colours[repository.language].color

  useEffect(() => {
      async function fetchData() {
      const response = await fetch(`https://raw.githubusercontent.com/${repository.full_name}/${repository.default_branch}/README.md`);
      if (response.status === 200) {
        const text = await response.text();
        setMDREADME(text);
        setHasREADME(true);
      }
    }
    void fetchData();
  }, [repository]);

  // const base64 = ''; // Request it from the server (I wonder about Rate Limits, authenticated users can make 5000 requests per hour)HomTE:

  // const textDecoder = new TextDecoder('utf-8');
  // const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
  // const text = textDecoder.decode(bytes);
  const text = mdREADME
  const preview = text.substring(0, 500);
  let html = marked(preview) as string;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const images = Array.from(doc.getElementsByTagName('img'));

  for (const img of images) {
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
  }

  html = doc.body.innerHTML;

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section m="md">
          <Group>
            <IconBookmark />
            <Link href={`https://github.com/${repository.full_name}`} style={{ color: 'inherit', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
              <Text>{repository.full_name}</Text>
            </Link>
            {!repository.private && <Badge variant="outline" color="rgba(163, 163, 163, 1)">Public</Badge>}
          </Group>

          <Group>
            <Text>{repository.description}</Text>
          </Group>

          <Group gap={5}>
            {colour && 
              <div style={{
                backgroundColor: colour as string,
                borderRadius: '50%',
                width: '20px',
                height: '20px',
              }} />}
            <Text>{repository.language}</Text>
            <ActionIcon variant="transparent" component="a" href={`https://github.com/${repository.full_name}/stargazers`}>
              <IconStar />
            </ActionIcon>
            <Text>{repository.stargazers_count}</Text>
            <ActionIcon variant="transparent" component="a" href={`https://github.com/${repository.full_name}/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc`}>
              <IconCircleDot />
            </ActionIcon>
            <Text>Updated {formatDistanceToNow(parseISO(repository.updated_at))} ago</Text>
          </Group>

          {hasREADME && (
            <>
              <Divider mt="xl"/>

              <div 
                className="markdown-content"
                style={{ 
                  maxWidth: '500px', 
                  fontSize: '14px', 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis' 
                }}
                  dangerouslySetInnerHTML={{ __html: html }} 
                />
                <style jsx>{`
                  .markdown-content img {
                    max-width: 10%;
                    height: auto;
                  }
                `}
                </style>
              </>
            )}
        </Card.Section>
      </Card>
    </>

  )  
}