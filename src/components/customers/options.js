import PropTypes from 'prop-types'
import React from 'react'
import {useOutletContext} from 'react-router-dom'

const emptyObject = {}

export const customerCityOptions = ({
    city: {
        children
    } = emptyObject
} = emptyObject) => children

export const useCustomerCityOptions = () => {
    const {options} = useOutletContext()
    return customerCityOptions(options)
}
