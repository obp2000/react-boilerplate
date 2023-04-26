import { NextResponse, type NextRequest } from 'next/server'
import prisma from '@/services/prisma'
import { assert } from 'superstruct'
import { getDictionary } from '@/app/i18n/dictionaries'
import type { HttpError } from 'http-errors'
import { struct } from '../struct'

export async function PUT(request: NextRequest,
  { params: { lng, id } }: {
    params: { lng: string, id: string }
  }
) {
  try {
    const data = await request.json()
    assert(data, struct)
    await prisma.customer.update({ where: { id: Number(id) }, data })
    const { successfully, customers, updated } = await getDictionary(lng)
    const message = `${customers.singular} ${successfully.toLowerCase()} ${updated}`
    return NextResponse.json({ message })
    // return res.json({ message })
  }
  catch (e) {
    const { statusCode, message } = e as HttpError
    return NextResponse.json({ message }, { status: statusCode })
  }
}

export async function DELETE(_: NextRequest,
  { params: { lng, id } }: {
    params: { lng: string, id: string }
  }
) {
  try {
    await prisma.customer.delete({ where: { id: Number(id) } })
    const { successfully, customers, deleted } = await getDictionary(lng)
    const message = `${customers.singular} ${successfully.toLowerCase()} ${deleted}`
    return NextResponse.json({ message })
    // return NextResponse.redirect(`/${lng}/customers`)
    // return res.json({ message })
  }
  catch (e) {
    const { statusCode, message } = e as HttpError
    return NextResponse.json({ message }, { status: statusCode })
  }
}

