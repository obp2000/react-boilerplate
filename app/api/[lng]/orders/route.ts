import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/services/prisma'
import { getDictionary } from '@/app/i18n/dictionaries'
import { struct } from './struct'
import { create as coerce } from 'superstruct'

export async function POST(request: NextRequest,
  { params: { lng } }: {
    params: { lng: string }
  }
) {
  const body = await request.json()
  const { postCost, orderItems, ...data } = coerce(body, struct)
  await prisma.order.create({
    data: {
      ...data,
      postCost: postCost as number,
      orderItems: { create: orderItems }
    }
  })
  const { successfully, orders, created } = await getDictionary(lng)
  const message = `${orders.singular} ${successfully.toLowerCase()} ${created}`
  return NextResponse.json({ message })
}
