import PropTypes from 'prop-types'
import React from 'react'
import Link from 'next/link'
import {useLinkToNewObject} from './hooks'

const LinkToNewObject = (props) => {
  const {isAuthenticated, label, ...linkAttrs} = useLinkToNewObject(props)
  // if (!isAuthenticated) {return null}
  return 	<Link {...linkAttrs} shallow={true} >
    <a className="btn btn-outline-primary btn-sm" disabled={!isAuthenticated} >
      {label}
    </a>
  </Link>
}

LinkToNewObject.propTypes = {
  	props: PropTypes.object,
}

export default LinkToNewObject
