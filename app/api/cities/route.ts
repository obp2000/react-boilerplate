import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/services/prisma'
import tables from '@/app/_tables/tables.json'

function where(term?: string | null) {
  if (!term) { return {} }
  const containsTerm = { contains: term }
  return {
    OR: [
      { city: containsTerm },
      { pindex: containsTerm },
    ]
  }
}

function findManyArgs(term?: string | null) {
  return {
    where: where(term),
    select: tables.customers.select.objects.city.select,
  }
}

export async function GET({ nextUrl: { searchParams } }: NextRequest) {
  const objects = await prisma.city.findMany(
    findManyArgs(searchParams.get('term')))
  return NextResponse.json(objects)
}
