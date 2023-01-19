import prisma from '@/services/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export function where({ term }: NextApiRequest["query"]) {
  if (!term) { return {} }
  const containsTerm = { contains: String(term) }
  return {
    OR: [
      { city: containsTerm },
      { pindex: containsTerm },
    ]
  }
}

// GET /api/cities?term=city
export default async function handle({
  method,
  query,
}: NextApiRequest, res: NextApiResponse) {
  if (method === 'GET') {
    const objects = await prisma.city.findMany({
      where: where(query),
      select: {
        id: true,
        pindex: true,
        city: true,
      }
    })
    res.json(objects)
  } else {
    throw new Error(
      `The HTTP ${method} method is not supported at this route.`
    )
  }
}
