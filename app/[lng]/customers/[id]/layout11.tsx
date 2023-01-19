import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import type { PropsWithChildren } from 'react'

export default async function ObjectLayout({
  children,
  params: {
    id,
  }
}: PropsWithChildren<Params>) {
  return <>
        {children}
      </>
}
