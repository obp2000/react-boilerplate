import { prisma } from '@/services/prisma'
import { NextResponse, type NextRequest } from 'next/server'
import { create as coerce } from 'superstruct'
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

export function findManyArgs(term?: string | null):
  Prisma.ProductFindManyArgs {
  return {
    where: where(term),
    select: tables.products.select.objects,
    orderBy: [
      {
        updatedAt: 'desc',
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
  const body = await request.json()
  const data = coerce(body, struct)
  const object = await prisma.product.create({ data })
  return NextResponse.json(object)
}
