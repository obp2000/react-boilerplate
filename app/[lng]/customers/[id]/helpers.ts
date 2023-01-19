import prisma from '@/services/prisma'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { cache } from 'react'
import select from './select.json'

export const getObject = cache(async ({ id }: Params) => {
  if (id === 'new') { return undefined }
  return prisma.customer.findUnique({
    where: {
      id: Number(id),
    },
    select,
  })
})


// export const getObjects = cache(async ({
//   indexUrl,
//   searchParams = {}
// }: Props): Promise<ObjectsWithTotals> => {
//   let params = new URLSearchParams(searchParams).toString()
//   if (params) {
//     params = `?${params}`
//   }
//   const options = requestInit()
//   // options.cache = 'no-store'
//   const res =
//     await fetch(`${baseUrl}${indexUrl}${params}`, options)
//   if (!res.ok) {
//     throw new Error('Failed to fetch objects')
//   }
//   const data = res.json()
//   return data
// })


// const initCustomer = {
//   id: undefined,
//   nick: '',
//   name: '',
//   city_id: undefined,
//   address: '',
//   created_at: new Date(),
//   updated_at: new Date(),
// }
