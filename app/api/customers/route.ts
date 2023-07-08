import { NextResponse } from 'next/server'
import { assert } from 'superstruct'


import tables from '@/app/_tables/tables.json'
import { struct } from './struct'
import { prisma } from '@/services/prisma'

import { Prisma } from "@prisma/client"
import type { NextRequest } from 'next/server'

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

export function findManyArgs(term?: string | null) {
  return {
    select: tables.customers.select.objects,
    where: where(term),
    orderBy: [
      {
        updatedAt: 'desc' as Prisma.SortOrder,
      },
    ],
  }
}

export async function GET({ nextUrl: { searchParams } }:
  NextRequest) {
  const objects = await prisma.customer.findMany(
    findManyArgs(searchParams.get('term')))
  return NextResponse.json(objects)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  assert(body, struct)
  const { city, ...data } = body
  const object = await prisma.customer.create({
    data: {
      cityId: city.id,
      ...data
    }
  })
  return NextResponse.json(object)
}
