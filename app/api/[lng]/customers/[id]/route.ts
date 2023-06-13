import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/services/prisma'
import { assert } from 'superstruct'
import { getDictionary } from '@/app/i18n/dictionaries'
import { struct } from '../struct'

export async function PUT(request: NextRequest,
  { params: { lng, id } }: {
    params: { lng: string, id: string }
  }
) {
  const data = await request.json()
  assert(data, struct)
  await prisma.customer.update({ where: { id: Number(id) }, data })
  const { successfully, customers, updated } = await getDictionary(lng)
  const message = `${customers.singular} ${successfully.toLowerCase()} ${updated}`
  return NextResponse.json({ message })
}

export async function DELETE(_: NextRequest,
  { params: { lng, id } }: {
    params: { lng: string, id: string }
  }
) {
  await prisma.customer.delete({ where: { id: Number(id) } })
  const { successfully, customers, deleted } = await getDictionary(lng)
  const message = `${customers.singular} ${successfully.toLowerCase()} ${deleted}`
  return NextResponse.json({ message })
}

