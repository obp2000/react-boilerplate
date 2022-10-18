import type { MouseEvent } from 'react'

export type Confirmation = {
  proceedLabel: string
  cancelLabel: string
  title: string
  confirmation: string
  show: boolean
  proceed: Function
  enableEscape: boolean
}

export type ProceedButtonProps = {
  label: string
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}
