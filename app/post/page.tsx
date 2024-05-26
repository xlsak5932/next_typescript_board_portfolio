import { fetchAllPost } from '@/lib/server_logic/lesson'

export default async function Post() {
  const allPost = await fetchAllPost()
  console.log('allPost >>> ', allPost)
  return <></>
}
