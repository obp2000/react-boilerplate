import React from 'react'
import { useFieldLabels } from './hooks'
import {
  CustomerOptions,
  ProductOptions,
  OrderOptions,
} from '../../../interfaces'

type Props = {
  tableFieldNames: string[]
  options: CustomerOptions | ProductOptions | OrderOptions
}

const FieldLabels = (props: Props) => {
  const fieldLabels = useFieldLabels(props)
  return <>
    {fieldLabels.map((fieldLabel: string, key: number): JSX.Element =>
      <th scope="col" key={key}>
        {fieldLabel}
      </th>
    )}
  </>
}

export default FieldLabels
