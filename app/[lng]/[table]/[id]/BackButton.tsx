'use client'

import Tooltip from "@/app/client/Tooltip"
import { useRouter } from 'next/navigation'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function BackButton({ label }: { label?: string }) {
  const { back } = useRouter()
  return <Tooltip title={label}>
    <ArrowBackIcon size={20} onClick={() => back()} cursor='pointer' />
  </Tooltip>
}
