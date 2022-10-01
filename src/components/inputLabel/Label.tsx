import React from 'react'
import { Label } from 'reactstrap'
import { useFieldLabel } from './hooks'
import type { SelectFieldAttrs, FieldAttrs, } from '../../../interfaces'

type LabelSizes = {
  labelSize?: string
  labelColSize?: number
}

function LabelComp(props: { name: string }): JSX.Element
function LabelComp(props: FieldAttrs & LabelSizes): JSX.Element
function LabelComp(props: SelectFieldAttrs & LabelSizes): JSX.Element
function LabelComp(props: any): JSX.Element {
  const { label, required, ...rest } = useFieldLabel(props)
  return <Label {...rest}>
    {label}{required && <strong>*</strong>}
  </Label>
}

export default LabelComp
