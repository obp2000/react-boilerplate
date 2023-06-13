import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import { loginStruct, Verified } from '@/app/user/struct'
import { prisma } from '@/services/prisma'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { verify } from "argon2"
import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { assert } from 'superstruct'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        name: { label: 'name', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials, { query }) {
        assert(credentials, loginStruct)
        const { name, password } = credentials
        const user = await prisma.user.findUnique({
          where: { name }
        })
        const { auth }
          = await getDictionary(query?.lng || fallbackLng)
        assert(user && await verify(user.password, password),
          Verified, auth.nameOrPasswordNotValid)
        return { ...user, id: String(user?.id) }
      }
    })
  ],
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }


// export const authOptions1: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         const { email, password } = credentials ?? {}
//         if (!email || !password) {
//           throw new Error("Missing username or password")
//         }
//         const user = await prisma.user.findUnique({
//           where: {
//             email,
//           },
//         });
//         // if user doesn't exist or password doesn't match
//         if (!user || !(await compare(password, user.password))) {
//           throw new Error("Invalid username or password")
//         }
//         return user
//       },
//     }),
//   ],
// }
