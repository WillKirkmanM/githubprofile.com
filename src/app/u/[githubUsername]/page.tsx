import type { Metadata } from 'next'
import type { GithubUser } from '~/server/api/routers/user'
import { api } from '~/trpc/server'
import GithubUserPage from './GithubUserPage'
 
type Props = {
  params: { githubUsername: string }
}
 
export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  try {
    const user: GithubUser = await api.user.queryGithubUser.query({ username: params.githubUsername })

    return {
      title: `${user.name} (@${user.login}) | Github Profile`,
      description: `${user.bio}`,
      icons: [{ rel: "icon", url: user.avatar_url }],
      keywords: "github, profile, repositories, user, followers, following, bio, name, login, avatar, url, website, location, twitter, company, email, hireable, bio, public_repos, public_gists, followers, following, created_at, updated_at, type, blog, company, twitter_username, site_admin, starred_url, subscriptions_url, organizations_url, repos_url, events_url, received_events_url, html_url, gravatar_id, node_id, id, followers_url, following_url, gists_url, login, avatar_url, url, html_url, followers_url, following_url, gists_url, starred_url, subscriptions_url, organizations_url, repos_url, events_url, received_events_url, type, site_admin, name, company, blog, location, email, hireable, bio, twitter_username, public_repos, public_gists, followers, following, created_at, updated_at"
    }
  } catch (error) {
    console.error(error);
    return {
      title: 'User not found',
      description: '',
      icons: [{ rel: "icon", url: '/favicon.ico' }],
      keywords: ''
    }
  }  
}
 
export default function Page({ params }: Props) {
  return (
    <GithubUserPage params={params} />
  )
}