import type { NewOrderItem, OrderItemUpdate } from '@/interfaces/orders'
import { prisma } from '@/services/prisma'
import { NextResponse, type NextRequest } from 'next/server'
import { assert } from 'superstruct'
import { structApi } from '../struct'

export async function PUT(request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const body = await request.json()
  // const { postCost, orderItems = [], ...data } = coerce(body, struct)
  assert(body, structApi)
  const { postCost, orderItems = [], ...data } = body
  console.log('data ', data)
  const object = await prisma.order.findUnique({
    where: { id: Number(id) },
    include: { orderItems: true }
  })
  const { newOrderItems, updateOrderItems, deletedOrderItemIds } =
    orderItems.reduce(
      ({
        newOrderItems,
        updateOrderItems,
        deletedOrderItemIds
      }: {
        newOrderItems: NewOrderItem[]
        updateOrderItems: OrderItemUpdate[]
        deletedOrderItemIds: number[]
      },
        { id, ...data }) => {
        if (id) {
          const index = deletedOrderItemIds.indexOf(id)
          if (index > -1) {
            deletedOrderItemIds.splice(index, 1)
          }
          updateOrderItems.push({
            where: { id },
            data
          })
        }
        else {
          newOrderItems.push(data)
        }
        return {
          newOrderItems,
          updateOrderItems,
          deletedOrderItemIds
        }
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
  return NextResponse.json(object)
}

export async function DELETE(_: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const object = await prisma.order.delete({ where: { id: Number(id) } })
  return NextResponse.json(object)
}
