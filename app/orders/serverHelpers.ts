import 'server-only'

import prisma from '@/services/prisma'
import { Prisma } from '@prisma/client'
import { ParsedUrlQuery } from 'querystring'
// import type { Order as ObjectsOrder } from './helpers'
import select from './select.json'
import { formInitialOrderItems } from './orderItems/serverHelpers'
import {
  orderItemsAmount,
  orderItemsCost,
  orderItemsWeight,
  postCostWithPacket,
  postDiscount,
  totalPostals,
  totalSum,
  totalWeight,
  type Values
} from './calculator'
import consts from './consts.json'
import type { Translation } from '@/app/i18n/dictionaries'
import type { Order } from './calculator'
import order from './order.json'

export function where({ term }: ParsedUrlQuery) {
  if (!term) { return {} }
  const containsTerm = { contains: String(term) }
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

export async function getObjects({
  perPage = 8,
  searchParams: {
    page = '1',
    term
  }
}: { perPage?: number } & { searchParams: ParsedUrlQuery }) {
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
    prisma.$queryRaw(ordersSql)
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

export async function getObject(id: number) {
  return await prisma.order.findUniqueOrThrow({
    where: {
      id,
    },
    select: select.object,
  })
}

export function getInitialValues11({ object }: { object?: Order }): Values {
  let { created_at, orderItems, ...rest } = object ?? {}
  let objectValues = {
    ...rest,
    orderItems: formInitialOrderItems(orderItems),
  } as Values
  objectValues = {
    ...objectValues,
    samples_weight: consts.SAMPLES_WEIGHT,
    packet_weight: consts.PACKET_WEIGHT,
    gift_weight: consts.GIFT_WEIGHT,
    order_items_amount: orderItemsAmount(null, objectValues),
    order_items_cost: orderItemsCost(null, objectValues),
    order_items_weight: orderItemsWeight(null, objectValues),
  }
  objectValues = {
    ...objectValues,
    post_cost_with_packet: postCostWithPacket(null, objectValues),
    post_discount: postDiscount(null, objectValues),
    total_postals: totalPostals(null, objectValues),
  }
  return {
    ...objectValues,
    total_sum: totalSum(null, objectValues),
    total_weight: totalWeight(null, objectValues),
  }
}

export function getInitialValues({ object = order }: { object?: Order }): Values {
  let { created_at, ...rest } = object
  let objectValues = rest as Values
  return objectValues
}

export function labels({
  add,
  delete: textDelete,
  not_found: notFound,
  count,
  order: labels,
  yes: okText,
  no: cancelText,
  customer: customerLabels,
  product: productLabels,
}: Translation) {
  return {
    add,
    textDelete,
    notFound,
    count,
    labels,
    label: textDelete,
    okText,
    cancelText,
    customerLabels,
    productLabels,
  }
}

export async function getOptions() {
  return {}
}
