'use client'

import Tooltip from "@/app/useClient/Tooltip"
import { useRouter } from 'next/navigation'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import IconButton from '@mui/material/IconButton'

export default function Button({ label }: { label?: string }) {
  const { back } = useRouter()
  return <Tooltip title={label}>
    <IconButton onClick={() => back()}>
      <ArrowBackIcon />
    </IconButton>
  </Tooltip>
}
