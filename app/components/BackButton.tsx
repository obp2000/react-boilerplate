'use client'

import { useRouter } from 'next/navigation'
import { ArrowBack } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'

export default function Button({ label }: { label: string }) {
  const { back } = useRouter()
  return <Tooltip title={label}>
    <IconButton onClick={() => back()}>
      <ArrowBack />
    </IconButton>
  </Tooltip>
}
