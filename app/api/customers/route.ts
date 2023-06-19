import tables from '@/app/_tables/tables.json'
import { prisma } from '@/services/prisma'
import { Prisma } from "@prisma/client"
import { NextResponse, type NextRequest } from 'next/server'
import { assert } from 'superstruct'
import { struct } from './struct'

function where(term?: string | null) {
  if (!term) { return {} }
  const containsTerm = { contains: term }
  return {
    OR: [
      { nick: containsTerm },
      { name: containsTerm },
      { address: containsTerm },
      { city: { city: containsTerm } }
    ]
  }
}

export function findManyArgs(term?: string | null):
  Prisma.CustomerFindManyArgs {
  return {
    where: where(term),
    select: tables.customers.select.objects,
    orderBy: [
      {
        updatedAt: 'desc',
      },
    ],
  }
}

export async function GET({ nextUrl: { searchParams } }: NextRequest) {
  const objects = await prisma.customer.findMany(
    findManyArgs(searchParams.get('term')))
  return NextResponse.json(objects)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  assert(data, struct)
  const object = await prisma.customer.create({ data })
  return NextResponse.json(object)
}
