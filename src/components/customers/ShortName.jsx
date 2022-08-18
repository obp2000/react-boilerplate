import PropTypes from 'prop-types'
import React from 'react'
import Name from './Name'
import {useShortName} from './hooks'

const ShortName = (props) => {
  const {nick, nameProps} = useShortName(props)
  return <>
  		{nick + ' '}
  		<Name {...nameProps} />
  	</>
}

ShortName.propTypes = {
  props: PropTypes.string,
}

export default ShortName
