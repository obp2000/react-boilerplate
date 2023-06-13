import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/services/prisma'
import { findManyArgs } from '@/app/customer/serverHelpers'
import { assert } from 'superstruct'
import { getDictionary } from '@/app/i18n/dictionaries'
import { struct } from './struct'

export async function GET({ nextUrl: { searchParams } }: NextRequest) {
  const objects = await prisma.customer.findMany(
    findManyArgs(Object.fromEntries(searchParams)))
  return NextResponse.json(objects)
}

export async function POST(request: NextRequest,
  { params: { lng } }: {
    params: { lng: string }
  }
) {
  const data = await request.json()
  assert(data, struct)
  await prisma.customer.create({ data })
  const { successfully, customers, created } = await getDictionary(lng)
  const message = `${customers.singular} ${successfully.toLowerCase()} ${created}`
  return NextResponse.json({ message })
}
