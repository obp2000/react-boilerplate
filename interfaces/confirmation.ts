import type { MouseEvent } from 'react'

export type Confirmation = {
  proceedLabel: string
  cancelLabel: string
  title: string
  proceed: (value?: boolean) => void
}

export type ProceedButtonProps = {
  label: string
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}
