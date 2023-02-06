// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const fruits = [
  "kiwi",
  "peach",
  "banana",
  "plum",
  "orange",
]


export default function handler(req, res) {
  res.status(200).json( fruits )
}
