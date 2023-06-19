import { prisma } from '@/services/prisma'
import { NextResponse, type NextRequest } from 'next/server'
import { create as coerce } from 'superstruct'
import { struct } from '../struct'

export async function PUT(request: NextRequest,
  { params: { id } }: {
    params: { id: string }
  }
) {
  const body = await request.json()
  const data = coerce(body, struct)
  const object = await prisma.product.update({ where: { id: Number(id) }, data })
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
