import PropTypes from 'prop-types'
import React from 'react'
import {useOutletContext} from 'react-router-dom'
import {Button} from 'reactstrap'
import Loader from 'react-loader'
import {deleteWithConfirm} from './deleteWithConfirm'

const emptyObject = {}

const DeleteObjectButton = ({
	object: {
		id
	} = emptyObject,
}) => {
	const {indexUrl, useDeleteObjectMutation, commonConsts} = useOutletContext()
	const [deleteObject, {isLoading}] = useDeleteObjectMutation()
	return  <Loader loaded={!isLoading} >
			<Button size='sm'
	           		outline
	                aria-labelledby={commonConsts?.delete}
	                onClick={deleteWithConfirm(deleteObject, {id}, commonConsts)}>
	                {commonConsts?.delete}
	        </Button>
        </Loader>
}

DeleteObjectButton.propTypes = {
	id: PropTypes.number,
}

export default DeleteObjectButton
