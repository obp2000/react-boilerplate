import PropTypes from 'prop-types'
import React from 'react'
import Link from 'next/link'
import {useLinkToNewOrEditObject} from './hooks'

const LinkToNewOrEditObject = (props) => {
  const {label, ...linkAttrs} = useLinkToNewOrEditObject(props)
  return 	<Link {...linkAttrs} shallow={true}>
    <a className="btn btn-outline-primary btn-sm">
      {label}
    </a>
  </Link>
}

LinkToNewOrEditObject.propTypes = {
  	props: PropTypes.object,
}

export default LinkToNewOrEditObject
