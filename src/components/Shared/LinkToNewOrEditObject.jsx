import PropTypes from 'prop-types'
import React from 'react'
import {Link, useOutletContext} from 'react-router-dom'

const LinkToNewOrEditObject = ({object}) => {
	const {indexUrl, commonConsts} = useOutletContext()
	const [objectId, label] = object ?
		[object.id, commonConsts.edit] :
		['new', commonConsts.new]
	return <Link to={`${indexUrl}${objectId}`}
                 state={{object}}
                 className="btn btn-outline-primary btn-sm"
                 aria-labelledby={label}>
            {label}
          </Link>
}

LinkToNewOrEditObject.propTypes = {
  object: PropTypes.object,
}

export default LinkToNewOrEditObject
