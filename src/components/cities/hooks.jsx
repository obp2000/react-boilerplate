import React from 'react'
import CityName from './CityName'

const indexUrl = '/cities/'

const dropdownListTextField = ({city, pindex}) => [city, pindex]

export const useDropdown = (options) => ({
	textField: dropdownListTextField,
    dataKey: 'id',
    searchPath: indexUrl,
    renderValue: ({item}) => <CityName {...{...item, options}} />
})
