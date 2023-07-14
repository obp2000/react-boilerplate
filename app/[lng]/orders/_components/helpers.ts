import { prisma } from "@/services/prisma"
import { Prisma } from "@prisma/client"

import type {
	PaginateFunction,
	PaginateOptions
} from "prisma-pagination"

function where(term?: string | null) {
  if (!term) { return {} }
  const containsTerm = { contains: term }
  return {
    customer: {
      OR: [
        { nick: containsTerm },
        { name: containsTerm },
        { address: containsTerm },
        { city: { city: containsTerm } }
      ]
    }
  }
}

function findMany({
  where,
  take,
  skip,
}: {
  where: any
  take: number
  skip: number
}) {
  const term = where?.customer?.OR?.nick?.contains
  let whereSql = Prisma.sql``
  if (term) {
    const termMod = `%${term}%`
    whereSql = Prisma.sql`WHERE "customer_customer"."nick" LIKE ${termMod} OR
      "customer_customer"."name" LIKE ${termMod} OR
      "customer_customer"."address" LIKE ${termMod} OR
      "customer_city"."city" LIKE ${termMod}`
  }
  const ordersSql = Prisma.sql`SELECT "order_order"."id",
    "order_order"."address" AS "orderAddress",
    "order_order"."created_at" AS "createdAt",
    "order_order"."updated_at" AS "updatedAt",
    SUM(("order_item_orderitem"."price" * "order_item_orderitem"."amount")) AS "orderItemsCost",
    "customer_customer"."nick",
    "customer_customer"."name",
    "customer_customer"."address" AS "customerAddress",
    "customer_city"."pindex",
    "customer_city"."city"
    FROM "order_order"
    LEFT OUTER JOIN "order_item_orderitem"
      ON ("order_order"."id" = "order_item_orderitem"."order_id")
    LEFT OUTER JOIN "customer_customer"
      ON ("order_order"."customer_id" = "customer_customer"."id")
    LEFT OUTER JOIN "customer_city"
      ON ("customer_customer"."city_id" = "customer_city"."id")
    ${whereSql}
    GROUP BY "order_order"."id",
         "customer_customer"."id",
         "customer_city"."id"
    ORDER BY "updatedAt" DESC
    OFFSET ${skip}
    LIMIT ${take}`
  return prisma.$queryRaw(ordersSql) as Promise<[]>
}

export const createPaginator = (
	defaultOptions: PaginateOptions): PaginateFunction => {
  return async (model, args: any = { where: undefined }, options) => {
    const page = Number(options?.page || defaultOptions?.page) || 1
    const perPage =
    	Number(options?.perPage || defaultOptions?.perPage) || 10
    const skip = page ? perPage * (page - 1) : 0
    const [total, data] = await Promise.all([
      model.count({ where: args.where }),
      findMany({
        ...args,
        take: perPage,
        skip,
      }),
    ])
    const lastPage = Math.ceil(total / perPage)
	return {
      data,
      meta: {
        total,
        lastPage,
        currentPage: page,
        perPage,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
      },
    }
  }
}

export function findManyArgs(term?: string | null) {
  return {
    where: where(term),
  }
}
