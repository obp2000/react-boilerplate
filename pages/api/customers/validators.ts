import { City } from '@/pages/api/cities/validators'
import { assert, integer, object, optional, size, string } from 'superstruct'
// import type { Values } from '@/app/[lng]/customers/[id]/calculator'
import type { NextApiRequest } from 'next'

export const Customer = object({
  id: optional(integer()),
  nick: size(string(), 1, 255),
  name: string(),
  address: string(),
  city: optional(City),
})

export function validate({
  body: {
    nick,
    name = '',
    address = '',
    city,
  } }: NextApiRequest) {
  const data = {
    nick,
    name,
    address,
    city,
  }
  assert(data, Customer)
  return data
}


// const Connect = object({
//   id: optional(integer())
// })

// const City = object({
//   connect: Connect,
// })

// const Disconnect = object({
//   disconnect: boolean()
// })
