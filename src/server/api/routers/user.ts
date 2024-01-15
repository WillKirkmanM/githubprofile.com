import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export interface GithubUser {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  name: string
  company: string
  blog: string
  location: string | null 
  email: string | null
  hireable: boolean
  bio: string
  twitter_username: string | null 
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}


export const userRouter = createTRPCRouter({
  queryGithubUser: publicProcedure.input(z.object({ username: z.string() })).query(async ({ input }) => {
    const res = await fetch(`https://api.github.com/users/${input.username}`);
    console.log("Fetching")
    const data: GithubUser = await res.json() as GithubUser;
    return data;
  }),
});
