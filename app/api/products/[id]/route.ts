import { struct } from '../struct'
import { prisma } from '@/services/prisma'
import { NextResponse, type NextRequest } from 'next/server'
import { assert } from 'superstruct'

export async function PUT(request: NextRequest,
  { params: { id } }: {
    params: { id: string }
  }
) {
  const data = await request.json()
  assert(data, struct)
  const object = await prisma.product.update({
    where: { id: Number(id) },
    data
  })
  return NextResponse.json(object)
}

export async function DELETE(_: NextRequest,
  { params: { id } }: {
    params: { id: string }
  }
) {
  const object = await prisma.product.delete({ where: { id: Number(id) } })
  return NextResponse.json(object)
}
