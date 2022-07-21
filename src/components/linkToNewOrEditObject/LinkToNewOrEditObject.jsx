import PropTypes from 'prop-types'
import React from 'react'
import {Link} from 'react-router-dom'
import {useLinkToNewOrEditObject} from './hooks'

const LinkToNewOrEditObject = ({indexUrl, object}) => {
	const linkAttrs = useLinkToNewOrEditObject(indexUrl, object)
	return 	<Link className="btn btn-outline-primary btn-sm"
				  {...linkAttrs}
			/>
}

LinkToNewOrEditObject.propTypes = {
	indexUrl: PropTypes.string,
  	object: PropTypes.object,
}

export default LinkToNewOrEditObject
