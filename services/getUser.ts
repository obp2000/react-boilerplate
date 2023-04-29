import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import prisma from '@/services/prisma'

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getUsername() {
  try {
    const session = await getSession()
    return session?.user?.name
  } catch (error) {
    return
  }
}

export async function isLoggedIn() {
  const name = await getUsername()
  return !!name
}

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


// import { cookies } from "next/headers"
// import { unsealData } from "iron-session"
// import { ironConfig } from "./ironConfig"
// import type { UserObject as User } from '@/interfaces/users'

// export default async function useUser() {
//   const cookie = cookies().get(ironConfig.cookieName)
//   if (cookie) {
//     const { user } = await unsealData(cookie.value, { password: ironConfig.password })
//     if (user)
//       return user as User
//   }
//   return undefined
// }
