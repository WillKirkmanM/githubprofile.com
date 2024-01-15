"use client"

import { Title, Text, Avatar, Stack, Group } from "@mantine/core";
import { api } from "~/trpc/react";

interface UserPageProps {
  params: {
    githubUsername: string;
  }
}


export default function GithubUserPage({ params }: UserPageProps) {
  const user = api.user.queryGithubUser.useQuery({ username: params.githubUsername }).data

  return (
    <>
      {user ? (
        <>
          <Group>
              <Avatar src={user.avatar_url} size="lg" />
            <Stack gap="xs">
              <Title>{user.name}</Title>
              <Text>@{user.bio}</Text>
            </Stack>
          </Group>
        </>
      ) : (
        <Text>Not found</Text>
      )}
    </>
  )
}