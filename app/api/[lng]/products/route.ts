import { getDictionary } from '@/app/i18n/dictionaries'
import { findManyArgs } from '@/app/product/serverHelpers'
import { prisma } from '@/services/prisma'
import { NextResponse, type NextRequest } from 'next/server'
import { create as coerce } from 'superstruct'
import { struct } from './struct'

export async function GET({ nextUrl: { searchParams } }: NextRequest) {
  const objects = await prisma.product.findMany(
    findManyArgs(Object.fromEntries(searchParams)))
  return NextResponse.json(objects)
}

export async function POST(request: NextRequest,
  { params: { lng } }: {
    params: { lng: string }
  }
) {
  const body = await request.json()
  const data = coerce(body, struct)
  await prisma.product.create({ data })
  const { successfully, products, created } = await getDictionary(lng)
  const message = `${products.singular} ${successfully.toLowerCase()} ${created}`
  return NextResponse.json({ message })
}
