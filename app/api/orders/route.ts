import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/services/prisma'
import { struct } from './struct'
import { create as coerce } from 'superstruct'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { postCost, orderItems, ...data } = coerce(body, struct)
  const object = await prisma.order.create({
    data: {
      ...data,
      postCost: postCost as number,
      orderItems: { create: orderItems }
    }
  })
  return NextResponse.json(object)
}
