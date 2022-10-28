import { FC, useContext } from 'react'
import type { ProductOptionsType } from '../../interfaces/products'
import { OptionsContext } from '../layout/Layout'

const TableLabels: FC = () => {
  const { options } = useContext(OptionsContext) as ProductOptionsType
  if (!options) { return null }
  return <>
    <th scope="col">
      {options.id.label}
    </th>
    <th scope="col">
      {options.name.label}
    </th>
    <th scope="col">
      {options.price.label}
    </th>
    <th scope="col">
      {options.width.label}
    </th>
    <th scope="col">
      {options.density.label}
    </th>
    <th scope="col">
      {options.created_at.label}
    </th>
    <th scope="col">
      {options.updated_at.label}
    </th>
  </>
}

export default TableLabels
