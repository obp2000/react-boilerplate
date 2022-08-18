import React from 'react'
import CityName from './CityName'

const emptyObject = {}

const indexUrl = '/cities/'

const dropdownListTextField = ({city, pindex}) => [city, pindex]

export const useDropdown = (options) => ({
  textField: dropdownListTextField,
  dataKey: 'id',
  searchPath: indexUrl,
  renderValue: ({item}) => <CityName {...item} options={options} />,
})

export const usePindex = ({
  pindex,
  options,
}) => ({
  pindex,
  label: options?.pindex?.label.substring(0, 3).toLowerCase(),
})

export const useCityName = ({
  city,
  options,
  ...restCity
}) => ({
  city,
  pindexProps: {...restCity, options},
})
