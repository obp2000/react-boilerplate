import { City } from '@/pages/api/cities/city'
import { date, defaulted, object, optional, size, string } from 'superstruct'

export const Customer = object({
  nick: size(string(), 1, 255),
  name: defaulted(string(), () => ''),
  address: defaulted(string(), () => ''),
  city: optional(City),
  created_at: optional(date()),
  updated_at: date()
})



// const Connect = object({
//   id: optional(integer())
// })

// const City = object({
//   connect: Connect,
// })

// const Disconnect = object({
//   disconnect: boolean()
// })
