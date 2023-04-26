'use client'

import { ObjectsTableBody } from '@/app/components/Skeletons'
import type { ReactNode } from 'react'
import ClientOnlyComp from '@/app/components/ClientOnly'

export default function ClientOnly({ children }: { children: ReactNode }) {
  return <ClientOnlyComp {...{ children, fallback: ObjectsTableBody }} />
}
