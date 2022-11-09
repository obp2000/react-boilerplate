import { FC, useContext } from 'react'
import type { CustomerOptionsType } from '@/interfaces/customers'
import { MainContext } from '@/services/context'

const TableLabels: FC = () => {
  const { options } = useContext(MainContext) as CustomerOptionsType
  if (!options) { return null }
  return <>
    <th scope="col">{options.id.label}</th>
    <th scope="col">{options.name.label}</th>
    <th scope="col">{options.city.label}</th>
    <th scope="col">{options.address.label}</th>
    <th scope="col">{options.created_at.label}</th>
    <th scope="col">{options.updated_at.label}</th>
  </>
}

export default TableLabels
