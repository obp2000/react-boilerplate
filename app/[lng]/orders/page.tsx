import { TablePage } from '@/app/_tables/TablePage'
import type { Translation } from "@/app/i18n/dictionaries"
import type { Order, SerializedOrder } from '@/interfaces/orders'
import Date from '@/app/components/Date'
import { getShortName } from '@/app/customer/serverHelpers'
import { prisma } from '@/services/prisma'
import { Prisma } from '@prisma/client'
import { cache } from 'react'

export function where({ term }: { term?: string }) {
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

const getObjects = cache(async function ({
  perPage = Number(process.env.NEXT_PUBLIC_OBJECTS_PER_PAGE),
  searchParams: {
    page = '1',
    term
  }
}: {
  perPage: number
  searchParams: {
    page?: string
    term?: string
  }
}) {
  const currentPage = parseInt(page)
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
    LIMIT ${perPage}`
  // console.log('ordersSql ', ordersSql)
  const [total, data] = await Promise.all([
    prisma.order.count({ where: where({ term }) }),
    prisma.$queryRaw(ordersSql)
  ])
  const lastPage = Math.ceil(total / perPage)
  return {
    data: data as Order[],
    meta: {
      total,
      lastPage,
      currentPage,
      perPage,
      prev: currentPage > 1 ? currentPage - 1 : null,
      next: currentPage < lastPage ? currentPage + 1 : null,
    },
  }
})

export function getTableRow({ customer }: Translation) {
  const shortName = getShortName(customer)
  return function tableRow({
    id,
    nick,
    name,
    orderItemsCost,
    createdAt,
    updatedAt
  }: SerializedOrder) {
    return [
      id,
      shortName({ nick, name }),
      orderItemsCost,
      <Date key={id} dateString={createdAt} />,
      <Date key={id + 1} dateString={updatedAt} />,
    ]
  }
}

export default async function Page(props: {
  params: { lng: string }
  searchParams: { page?: string, term?: string }
}) {
  const table = 'orders'
  return <TablePage {...{
    ...props,
    table,
    getObjects,
    getTableRow,
  }} />
}
