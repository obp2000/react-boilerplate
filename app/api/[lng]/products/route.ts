import { getDictionary } from '@/app/i18n/dictionaries'
import { findManyArgs } from '@/app/product/serverHelpers'
import prisma from '@/services/prisma'
import type { HttpError } from 'http-errors'
import { NextResponse, type NextRequest } from 'next/server'
import { create as coerce } from 'superstruct'
import { struct } from './struct'

export async function GET({ nextUrl: { searchParams } }: NextRequest) {
  const objects = await prisma.product.findMany(
    findManyArgs(Object.fromEntries(searchParams)))
  return NextResponse.json(objects)
}

export async function POST(request: NextRequest,
  { params: { lng } }: {
    params: { lng: string }
  }
) {
  try {
    const body = await request.json()
    const data = coerce(body, struct)
    await prisma.product.create({ data })
    const { successfully, products, created } = await getDictionary(lng)
    const message = `${products.singular} ${successfully.toLowerCase()} ${created}`
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

// export async function getObjectData(request: IncomingMessage) {
//   const { fields, files: { image } } = await getData(request)
//   let data = create(fields, struct)
//   if (image) {
//     data.image = await upload(image)
//   }
//   return data
// }

// export async function POST(request: IncomingMessage,
//   { params: { lng } }: {
//     params: { lng: string }
//   }
// ) {
//   try {
//     const data = await getObjectData(request)
//     await prisma.product.create({ data })
//     const { successfully, products, created } = await getDictionary(lng)
//     const message = `${products.singular} ${successfully.toLowerCase()} ${created}`
//     return NextResponse.json({ message })
//   }
//   catch (e) {
//     const { statusCode, message } = e as HttpError
//     return NextResponse.json({ message }, { status: statusCode })
//   }
// }
