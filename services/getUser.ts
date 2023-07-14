import { cache } from 'react'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import { prisma } from '@/services/prisma'

export async function getSession() {
  return await getServerSession(authOptions)
}

export const getUsername = cache(async () => {
  try {
    const session = await getSession()
    return session?.user?.name
  } catch (error) {
    return
  }
})

// export async function isLoggedIn() {
//   const name = await getUsername()
//   return !!name
// }

export default async function getUser() {
  try {
    const name = await getUsername()
    if (!name) {
      return null
    }
    const user = await prisma.user.findUnique({
      where: {
        name,
      }
    })
    if (!user) {
      return null
    }
    return user
  } catch (error) {
    return null
  }
}
