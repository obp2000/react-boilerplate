import { getDictionary } from '@/app/i18n/dictionaries'
import prisma from '@/services/prisma'
import type { HttpError } from 'http-errors'
import { NextResponse, type NextRequest } from 'next/server'
import { create as coerce } from 'superstruct'
import { struct } from '../struct'

export async function PUT(request: NextRequest,
  { params: { lng, id } }: {
    params: { lng: string, id: string }
  }
) {
  try {
    const body = await request.json()
    const data = coerce(body, struct)
    await prisma.product.update({ where: { id: Number(id) }, data })
    const { successfully, products, updated } = await getDictionary(lng)
    const message = `${products.singular} ${successfully.toLowerCase()} ${updated}`
    return NextResponse.json({ message })
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
    await prisma.product.delete({ where: { id: Number(id) } })
    const { successfully, products, deleted } = await getDictionary(lng)
    const message = `${products.singular} ${successfully.toLowerCase()} ${deleted}`
    return NextResponse.json({ message })
  }
  catch (e) {
    const { statusCode, message } = e as HttpError
    return NextResponse.json({ message }, { status: statusCode })
  }
}


// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

// export async function PUT(request: IncomingMessage,
//   { params: { lng, id } }: {
//     params: { lng: string, id: string }
//   }
// ) {
//   try {
//     const data = await getObjectData(request)
//     await prisma.product.update({ where: { id: Number(id) }, data })
//     const { successfully, products, updated } = await getDictionary(lng)
//     const message = `${products.singular} ${successfully.toLowerCase()} ${updated}`
//     return NextResponse.json({ message })
//   }
//   catch (e) {
//     const { statusCode, message } = e as HttpError
//     return NextResponse.json({ message }, { status: statusCode })
//   }
// }


