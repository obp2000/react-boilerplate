import { Prisma } from "@prisma/client"
import select from './select.json'

export type Customer = Prisma.CustomerGetPayload<{ select: typeof select }>
