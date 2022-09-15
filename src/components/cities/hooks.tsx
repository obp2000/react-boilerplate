import React from 'react'
import CityName from './CityName'
import { City, CityOptions } from '../../../interfaces'

const indexUrl = '/cities/'

const dropdownListTextField = ({ city, pindex }: City): string[] => [city, pindex]

export const useDropdown = (options: CityOptions | undefined) => ({
  textField: dropdownListTextField,
  dataKey: 'id',
  searchPath: indexUrl,
  renderValue: ({ item }: { item: City }): JSX.Element =>
    <CityName object={item} options={options} />,
})
