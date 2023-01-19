import { OrdersSelect } from '@/interfaces/api'
import prisma from '@/services/prisma'
import { Prisma } from '@prisma/client'
import { ParsedUrlQuery } from 'querystring'
import { where } from './helpers'

export async function getObjects({
  perPage = 8,
  searchParams: {
    page = '1',
    term
  }
}: { perPage?: number } & {searchParams: ParsedUrlQuery} ) {
  const currentPage = parseInt(String(page))
  const skip = currentPage > 0 ? perPage * (currentPage - 1) : 0
  let whereSql = Prisma.sql``
  if (term) {
    const termMod = `%${term}%`
    whereSql = Prisma.sql`WHERE "customer_customer"."nick" LIKE ${termMod} OR
      "customer_customer"."name" LIKE ${termMod} OR
      "customer_customer"."address" LIKE ${termMod} OR
      "customer_city"."city" LIKE ${termMod}`
  }
  const ordersSql = Prisma.sql`SELECT "order_order"."id",
    "order_order"."address" AS "order_address",
    "order_order"."created_at",
    "order_order"."updated_at",
    SUM(("order_item_orderitem"."price" * "order_item_orderitem"."amount")) AS "order_items_cost",
    "customer_customer"."nick",
    "customer_customer"."name",
    "customer_customer"."address" AS "customer_address",
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
    ORDER BY "order_order"."updated_at" DESC
    OFFSET ${skip}
    LIMIT ${perPage}`
  // console.log('ordersSql ', ordersSql)
  const [total, data] = await Promise.all([
    prisma.order.count({ where: where({ term }) }),
    prisma.$queryRaw(ordersSql) as Promise<OrdersSelect[]>
  ])
  const lastPage = Math.ceil(total / perPage)
  return {
    data,
    meta: {
      total,
      lastPage,
      currentPage,
      perPage,
      prev: currentPage > 1 ? currentPage - 1 : null,
      next: currentPage < lastPage ? currentPage + 1 : null,
    },
  }
}


// async function orderCount({ term }: { term?: string }) {
//   return prisma.order.count({ where: where({ term }) })
// }

// WHERE UPPER("customer_customer"."nick"::text) LIKE UPPER('%ole%')

  // {
  //   id: 42423,
  //   customer_id: 51,
  //   post_cst: 0,
  //   packet: null,
  //   delivery_type: 0,
  //   address: 'Красноярский край, Ермаковский район, с Ивановка, Ленина ул, 8',
  //   gift: '',
  //   created_at: 2022-01-28T08:24:35.286Z,
  //   updated_at: 2022-09-30T12:58:36.508Z,
  //   order_items_cost: 1420,
  //   nick: 'oleg222',
  //   name: 'Вася Пупкин28',
  //   city_id: 42423,
  //   pindex: '662826',
  //   city: 'Ивановка, 24, Ермаковский',
  //   opsname: 'Ивановка'
  // }
