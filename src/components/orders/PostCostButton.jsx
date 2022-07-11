import PropTypes from 'prop-types'
import React from 'react'
import {useOutletContext} from 'react-router-dom'
import {Button} from 'reactstrap'

const emptyObject = {}

const PostCostButton = ({
	form: {
		mutators: {
			postCostCount
		}
	},
	values: {
		customer,
		total_weight: totalWeight
	} = emptyObject
}) => {
	const {commonConsts} = useOutletContext()
	return <Button
              name='post_cost_button'
              type = "button"
              color = "primary"
              outline
              size = "sm"
              onClick={() => postCostCount()}
              disabled={!customer?.city?.pindex || !totalWeight}>
              {commonConsts?.count}
            </Button>
}

PostCostButton.propTypes = {
	postCostCount: PropTypes.func,
	customer: PropTypes.object,
	totalWeight: PropTypes.number,
}

export default PostCostButton
