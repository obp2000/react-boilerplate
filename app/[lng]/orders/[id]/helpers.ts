import { Prisma } from "@prisma/client"
import select from './select.json'

export type Order = Prisma.OrderGetPayload<{ select: typeof select }>
