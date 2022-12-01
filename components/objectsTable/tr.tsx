import 'server-only'

import { TableOptionsType } from "@/interfaces/options"
import { ReactNode } from "react"

export default function Tr({
  options,
  children
}: TableOptionsType & { children: ReactNode }) {
  return <tr aria-label={options?.name_singular}>
    {children}
  </tr>
}
