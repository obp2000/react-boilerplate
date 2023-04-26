'use client'

import type { ReactNode } from 'react'
import { Form } from '@/app/components/Skeletons'
import ClientOnlyComp from '@/app/components/ClientOnly'

export default function ClientOnly({ children }: { children: ReactNode }) {
  return <ClientOnlyComp {...{ children, fallback: Form }} />
}
