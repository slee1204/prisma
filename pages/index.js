import Head from 'next/head'
import { prisma } from '../server/db/client'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

export default function Home(props) {

  const [title, setTitle] = useState('')
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('')
  const [posts, setPosts] = useState(props.posts)

  const addInput = (e) => setTitle(e.target.value);

  useEffect(() => {
    setPosts(props.posts);
    }, [props.posts]);

  const handleSubmit = async (e) => {
  e.preventDefault()
  const res = await axios.post('/api/posts', { title, code, language })
  setPosts([...posts, res.data])
  console.log({title, code, language})}


  return (
    <>
      <Head>
        <title>Sue's Prisma</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Home</h1>
        {/* <button onClick={()=>router.push("/addPost")}>
          Is this working
        </button> */}

        <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", maxWidth: "400px"}}>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            addInput={addInput}
          />
          <textarea 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
          />
          <textarea 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)} 
          />
          <button type="submit">Submit</button>
        </form>


        <ul>
            {posts?.map(post => (
              <li key={post.id}>
                <div key={post.id}>
                  <h2>{post.title}</h2>
                  <p>{post.code}</p>
                  <p>{post.language}</p>
                </div>
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
