import type { ReactNode } from 'react'
import type { IndexUrl } from '.'
import { ObjectsContextType } from './api'
import { MainContextType } from './options'

export type LayoutType = IndexUrl & {
  children: ReactNode
}

export type AsyncLayoutType =
  ({ children }: {children: ReactNode}) => Promise<JSX.Element>

export type MainContainerProps = {
  mainContext: MainContextType
  objectsContext?: ObjectsContextType
  children: ReactNode
}
