import type { ReactNode } from 'react'

export type ConditionIsProps = {
  when: string
  'is'?: boolean
  children: ReactNode
}

export type ConditionGtProps = {
  when: string
  gt?: number
  children: ReactNode
}

export type ConditionGteProps = {
  when: string
  gte?: number
  children: ReactNode
}
