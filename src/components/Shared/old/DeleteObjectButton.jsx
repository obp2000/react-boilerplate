import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'reactstrap'
import Loader from 'react-loader'
import {useDeleteObject} from './hooks'

const DeleteObjectButton = ({useDeleteObjectMutation, object}) => {
	const {isDeletingObject, ...buttonAttrs} =
		useDeleteObject(useDeleteObjectMutation, object)
	return 	<Loader loaded={!isDeletingObject}>
				<Button
					size='sm'
					outline
					{...buttonAttrs}
				/>
	        </Loader>
}

DeleteObjectButton.propTypes = {
	useDeleteObjectMutation: PropTypes.func,
	object: PropTypes.object,
}

export default DeleteObjectButton
