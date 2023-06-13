'use client'

import { useRouter } from 'next/navigation'
import { ArrowBack } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import Tooltip from '@/app/components/Tooltip'

export default function Button({ label }: { label: string }) {
  const { back } = useRouter()
  return <Tooltip title={label}>
    <IconButton onClick={() => back()}>
      <ArrowBack />
    </IconButton>
  </Tooltip>
}
