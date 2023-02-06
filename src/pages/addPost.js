import Head from 'next/head'
import axios from 'axios'
import { useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { prisma } from 'server/db/client'

export default function Post({ posts }){

    
    const [title, setTitle] = useState('')
    const [code, setCode] = useState('')
    const [language, setLanguage] = useState('')
  
    const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post('/api/posts', { title, code, language })
    setPosts([...posts, res.data])
    console.log({title, code, language})}


    // const handleSubmit = async ({ language, code }) => {
    // const { data } = await axios.post('/api/posts', {
    //     language,
    //     code,
    // })
    //     console.log(data)
    // }
    

    return(
        <>
            <Head>
                <title>Try Prisma</title>
            </Head>
            <div>
            <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", maxWidth: "400px"}}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea value={code} onChange={(e) => setCode(e.target.value)} />
                <textarea value={language} onChange={(e) => setLanguage(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
            </div>
        </>
    )
}