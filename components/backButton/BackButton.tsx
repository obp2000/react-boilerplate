'use client'

import Tooltip from "@/client/Tooltip"
import { useRouter } from 'next/navigation'
import { IoMdArrowRoundBack } from 'react-icons/io'

export default function BackButton({ label }: { label?: string }) {
  const { back } = useRouter()
  return <Tooltip content={label}>
    <IoMdArrowRoundBack size={20} onClick={() => back()} cursor='pointer' />
  </Tooltip>
}
