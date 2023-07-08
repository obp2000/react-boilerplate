import { prisma } from '@/services/prisma'
import { NextResponse, type NextRequest } from 'next/server'
import { assert } from 'superstruct'
import { struct } from './struct'
import tables from '@/app/_tables/tables.json'
import { Prisma } from "@prisma/client"

function where(term?: string | null) {
  if (!term) { return {} }
  const containsTerm = { contains: term }
  return {
    OR: [
      { name: containsTerm },
      { productType: { name: containsTerm } },
    ]
  }
}

export function findManyArgs(term?: string | null) {
  return {
    where: where(term),
    select: tables.products.select.objects,
    orderBy: [
      {
        updatedAt: 'desc' as Prisma.SortOrder,
      },
    ],
  }
}

export async function GET({ nextUrl: { searchParams } }: NextRequest) {
  const objects = await prisma.product.findMany(
    findManyArgs(searchParams.get('term')))
  return NextResponse.json(objects)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  assert(data, struct)
  console.log('body ', data)
  const object = await prisma.product.create({ data })
  // const object = {}
  return NextResponse.json(object)
}
