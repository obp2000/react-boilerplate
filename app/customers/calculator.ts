import type { Prisma } from "@prisma/client"
import select from './select.json'

export type Customer = Prisma.CustomerGetPayload<{ select: typeof select.object }>

export type Values = Prisma.CustomerCreateArgs['data'] |
  Prisma.CustomerUpdateArgs['data']
