import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'reactstrap'
import { getPostCost_nw } from '../redux/PostCost'

const PostCostButton = ({
    pindex,
    total_weight
}) => {
    const dispatch = useDispatch()
    return <Button
            name='post_cost_button'
            onClick = { getPostCost_nw(dispatch, pindex, total_weight) }
            type = "button"
            color = "primary"
            outline
            size = "sm"
            >
            Рассчитать
        </Button>
}

PostCostButton.propTypes = {
    pindex: PropTypes.string,
    total_weight: PropTypes.number
}

export default PostCostButton