'use client'

import Button from "@/client/Button"
import type { CommonConstsType } from '@/interfaces/commonConsts'
import { useRouter } from 'next/navigation'

export default function BackButton({ commonConsts }: CommonConstsType) {
  const router = useRouter()
  return <Button
    variant='outline-primary'
    size='sm'
    onClick={() => router.back()}
  >
    {commonConsts?.back}
  </Button>
}
