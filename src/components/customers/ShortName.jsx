import PropTypes from 'prop-types'
import React from 'react'
import {useOutletContext} from 'react-router-dom'
import Name from './Name'

const ShortName = ({
    nick,
    name,
    options = useOutletContext().options
}) => <>
  		{nick + ' '}
  		<Name name={name} label={options?.name?.label} />
  	</>

export default ShortName
