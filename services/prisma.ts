import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


// import { PrismaClient } from '@prisma/client'

// declare global {
//   var prisma: PrismaClient | undefined
// }

// const client = globalThis.prisma || new PrismaClient({ log: ['info'] })
// if (process.env.NODE_ENV !== "production") globalThis.prisma = client

// export default client


// const prisma = new PrismaClient({ log: ['query'] })

// ts-ignore 7017 is used to ignore the error that the global object is not
// defined in the global scope. This is because the global object is only
// defined in the global scope in Node.js and not in the browser.

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.

// Learn more:
// https://pris.ly/d/help/next-js-best-practices

// const globalForPrisma = global as unknown as { prisma: PrismaClient }

// export const prisma = globalForPrisma.prisma || new PrismaClient({ log: ['query'] })

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// export default prisma

// import { PrismaClient } from '@prisma/client'

// let prisma: PrismaClient

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient()
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient({ log: ['query'] })
//   }
//   prisma = global.prisma
// }

// export default prisma


// import { PrismaClient } from './node_modules/@prisma/client'
// const prisma = new PrismaClient()

// import { PrismaClient } from "@prisma/client"

// // PrismaClient is attached to the `global` object in development to prevent
// // exhausting your database connection limit.
// //
// // Learn more:
// // https://pris.ly/d/help/next-js-best-practices

// let prisma: PrismaClient

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient()
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient()
//   }
//   prisma = global.prisma
// }

// export default prisma
