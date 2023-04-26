import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import prisma from '@/services/prisma'

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getUser() {
  try {
    const session = await getSession()
    if (!session?.user?.name) {
      return null
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        name: session.user.name,
      }
    })
    if (!currentUser) {
      return null
    }
    return {
      ...currentUser,
    }
  } catch (error: any) {
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
