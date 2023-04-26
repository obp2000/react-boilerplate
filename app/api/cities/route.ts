import { NextResponse, type NextRequest } from 'next/server'
import prisma from '@/services/prisma'
import { findManyArgs } from '@/app/customer/cities/serverHelpers'

export async function GET({ nextUrl: { searchParams } }: NextRequest) {
  const objects = await prisma.city.findMany(
    findManyArgs(Object.fromEntries(searchParams)))
  return NextResponse.json(objects)
}
