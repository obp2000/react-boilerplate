import { loginStruct } from '@/app/user/struct'
import prisma from '@/services/prisma'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { verify } from "argon2"
import { Unauthorized } from 'http-errors'
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
// import GithubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google"
import { assert } from 'superstruct'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    // }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        name: { label: 'name', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        assert(credentials, loginStruct)
        // if (!credentials?.name || !credentials?.password) {
        //   throw Unauthorized('nameOrPasswordNotValid')
        // }
        const user = await prisma.user.findUnique({
          where: {
            name: credentials.name
          }
        })
        if (!user || !user.password) {
          throw Unauthorized('nameOrPasswordNotValid')
        }
        const verified = await verify(user.password, credentials.password)
        if (!verified) {
          throw Unauthorized('nameOrPasswordNotValid')
        }
        return { ...user, id: String(user.id) }
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

export default NextAuth(authOptions)
