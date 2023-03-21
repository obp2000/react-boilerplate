import { NextResponse, type NextRequest } from 'next/server'
import { where } from '@/app/customers/cities/db'
import tables from '@/app/objectPage/tables.json'
import prisma from '@/services/prisma'

export async function GET(request: NextRequest) {
  const objects = await prisma.city.findMany({
    where: where(Object.fromEntries(request.nextUrl.searchParams)),
    select: tables.customers.select.objects.city.select,
  })
  return NextResponse.json(objects)
}
