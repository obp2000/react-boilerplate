import 'server-only'

import { PropsWithChildren } from 'react'

export default function Tr({
  children,
  label
}: PropsWithChildren & { label: string }) {
  return <tr
    aria-label={label}
    className="border-b border-gray-200 hover:bg-gray-100">
    {children}
  </tr>
}
