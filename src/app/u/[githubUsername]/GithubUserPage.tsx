"use client"

import { Title, Text, Avatar, Stack, Group, SimpleGrid, Button, Center, Container, Loader } from "@mantine/core";
import { api } from "~/trpc/react";
// import user from "../../data/user.json"
// import repositories from "../../data/repository.json"
import RepositoryCard from "~/app/components/Repository/RepositoryCard";
import type { Repository } from "~/server/api/routers/user";

interface UserPageProps {
  params: {
    githubUsername: string;
  }
}

export default function GithubUserPage({ params }: UserPageProps) {
  const user = api.user.queryGithubUser.useQuery({ username: params.githubUsername }).data
  const repositories = api.user.queryGithubUserRepositories.useQuery({ username: params.githubUsername }).data

  return (
    <>
      {user ? (
        <>  
          <Center>
            <Group>
              <Avatar src={user.avatar_url} size={200} />

                <Stack gap="xl" mx={200}>
                  <Title>{user.login}</Title>
                  <Text>{user.name}</Text>

                  <Group>
                    <Stack gap={0.5} align="center">
                      <Text fw={700}>{user.public_repos}</Text>
                      <Text>{user.public_repos > 1 ? "Repositories" : "Repository"}</Text>
                    </Stack>

                    <Stack gap={0.5} align="center">
                      <Text fw={700}>{user.followers}</Text>
                      <Text>Followers</Text>
                    </Stack>

                    <Stack gap={0.5} align="center">
                      <Text fw={700}>{user.following}</Text>
                      <Text>Following</Text>
                    </Stack>
                  </Group>

                  <Container size="xl">
                    <Text>{user.bio}</Text>
                    <Text>@{user.login}</Text>
                    <Button color="indigo" component="a" href={`https://github.com/${user.login}`}>Follow</Button>
                  </Container>
                </Stack>
            </Group>
          </Center>
          <SimpleGrid cols={3} spacing="xl" verticalSpacing="xl">
            {repositories?.map((repository: Repository) => {
              if (!repository.fork) {
                return (
                  <RepositoryCard key={repository.id} repository={repository} />
                )
              }
            })}
          </SimpleGrid>
        </>
      ) : (
        <>
        <Center>
          <Loader />
        </Center>
        </>
      )}
    </>
  )
}