"use client"

import { Text, Title, Center, Code, Button } from "@mantine/core";
import { getServerAuthSession } from "~/server/auth";
import { IconBrandGithub } from "@tabler/icons-react";
import { signIn, useSession } from "next-auth/react";
import { api } from "~/trpc/server";

export default function Home() {
  return (
    <>
      <Button onClick={() => signIn("github")} color="#24292F" leftSection={<IconBrandGithub />}>Sign in with Github</Button>
    </>
  );
}
