'use client'

import { Prisma } from "@prisma/client"

export type Values = Prisma.CustomerCreateArgs['data'] |
  Prisma.CustomerUpdateArgs['data']
