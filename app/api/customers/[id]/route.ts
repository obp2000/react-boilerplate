import { NextResponse } from 'next/server'
import { assert } from 'superstruct'

import { struct } from '../struct'
import { prisma } from '@/services/prisma'

import type { NextRequest } from 'next/server'

export async function PUT(request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const body = await request.json()
  assert(body, struct)
  const { city, ...data } = body
  const object = await prisma.customer.update({
    where: { id: Number(id) },
    data: {
      cityId: city.id,
      ...data
    }
  })
  return NextResponse.json(object)
}

export async function DELETE(_: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const object = await prisma.customer.delete({
    where: { id: Number(id) }
  })
  return NextResponse.json(object)
}
