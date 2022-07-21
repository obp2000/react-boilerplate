import PropTypes from 'prop-types'
import React from 'react'
import {useOutletContext} from 'react-router-dom'
import {Button} from 'reactstrap'
import {usePostCostButton} from './hooks'

const PostCostButton = (props) => {
	const buttonAttrs = usePostCostButton(props)
	return 	<Button
              color = "primary"
              outline
              size = "sm"
              {...buttonAttrs}
            />
}

PostCostButton.propTypes = {
	props: PropTypes.object,
}

export default PostCostButton
