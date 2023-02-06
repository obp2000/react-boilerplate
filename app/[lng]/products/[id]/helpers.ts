import { Prisma } from "@prisma/client"
import select from './select.json'

export type Product = Prisma.ProductGetPayload<{ select: typeof select }>
