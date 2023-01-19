import type { CustomerSelect } from "@/interfaces/api"
import { Prisma } from "@prisma/client"

export type Values = Prisma.CustomerCreateArgs['data'] |
  Prisma.CustomerUpdateArgs['data'] | undefined

export const getInitialValues = ({
  object
}: { object?: CustomerSelect | null }): Values => {
  const { created_at, ...objectValues } = object || {}
  return objectValues as Values
}
