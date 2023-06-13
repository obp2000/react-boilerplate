import { getDictionary } from '@/app/i18n/dictionaries'
import type { NewOrderItem, OrderItemUpdate } from '@/interfaces/orders'
import { prisma } from '@/services/prisma'
import { NextResponse, type NextRequest } from 'next/server'
import { create as coerce } from 'superstruct'
import { struct } from '../struct'

export async function PUT(request: NextRequest,
  { params: { lng, id } }: {
    params: { lng: string, id: string }
  }
) {
  const body = await request.json()
  const { postCost, orderItems = [], ...data } = coerce(body, struct)
  const object = await prisma.order.findUnique({
    where: { id: Number(id) },
    include: { orderItems: true }
  })
  const { newOrderItems, updateOrderItems, deletedOrderItemIds } =
    orderItems.reduce(
      (result: {
        newOrderItems: NewOrderItem[],
        updateOrderItems: OrderItemUpdate[],
        deletedOrderItemIds: number[]
      },
        { id, ...data }) => {
        if (id) {
          const index = result.deletedOrderItemIds.indexOf(id)
          if (index > -1) {
            result.deletedOrderItemIds.splice(index, 1)
          }
          result.updateOrderItems.push({
            where: { id },
            data
          })
        }
        else {
          result.newOrderItems.push(data)
        }
        return result
      }, {
      newOrderItems: [],
      updateOrderItems: [],
      deletedOrderItemIds: object?.orderItems.map(({ id }) => id) || []
    })
  await prisma.$transaction(
    [prisma.order.update({
      where: { id: Number(id) },
      data: {
        ...data,
        postCost: postCost as number,
        orderItems: {
          create: newOrderItems,
          deleteMany: {
            id: {
              in: deletedOrderItemIds
            }
          },
        }
      }
    }),
    ...updateOrderItems.map((orderItem) =>
      prisma.orderItem.update(orderItem))
    ]
  )
  const { successfully, orders, updated } = await getDictionary(lng)
  const message = `${orders.singular} ${successfully.toLowerCase()} ${updated}`
  return NextResponse.json({ message })
}

export async function DELETE(_: NextRequest,
  { params: { lng, id } }: {
    params: { lng: string, id: string }
  }
) {
  await prisma.order.delete({ where: { id: Number(id) } })
  const { successfully, orders, deleted } = await getDictionary(lng)
  const message = `${orders.singular} ${successfully.toLowerCase()} ${deleted}`
  return NextResponse.json({ message })
}
