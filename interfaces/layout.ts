import type { ReactNode } from 'react'
import type { IndexUrl } from '.'

export type LayoutType = IndexUrl & {
  children?: ReactNode
}
