import { PrismaClient } from "@prisma/client"
// import { prisma } from "../../server/db/client"

const prisma = new PrismaClient()

// function titleFromCode(code) {
//     return code.trim().split('\n')[0].replace('// ', '')
// }



export default async function handler(req, res) {
    const { method } = req

    switch ( method ) {
        case 'POST':
            //Update or create data in your database  
            const {title, code, language} = req.body  
            const post = await prisma.post.create({
                data: {
                    title,
                    code,
                    language
                },
            })
            res.status(201).json(post)
            break
        default:
            res.status(405).end(`Method ${method} Not Allowed`)
        
    }
}