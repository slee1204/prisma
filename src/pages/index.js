import Head from 'next/head'
import { prisma } from '../../server/db/client'
import { useRouter } from 'next/router'

export default function Home({posts}) {

  const router = useRouter()


  return (
    <>
      <Head>
        <title>Sue's Prisma</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Home</h1>
        <button onClick={()=>router.push("/addPost")}>
          Is this working
        </button>
        <ul>
            {posts?.map(post => (
              <li key={post.id}>
                <PostSmall
                  post={post}
                  href={`/code/${post.id}`}
                  className='my-10'
                  onLike={() => console.log("like post", post.id)}
                  onComment={() => console.log("comment post", post.id)}
                  onShare={() => console.log("share post", post.id)}
                />
              </li>
            ))}
          </ul>
        <ul>
          {posts?.map(post => (
            <li key ={post.id}>

            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const posts = await prisma.post.findMany()

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    }
  }
}
