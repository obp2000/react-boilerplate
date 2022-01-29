import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'reactstrap'
import { getPostCost_nw } from '../redux/PostCost'

const PostCostButton = ({
    pindex,
    tolalWeight
}) => {
    const dispatch = useDispatch()
    return <Button
            name='post_cost_button'
            onClick = { getPostCost_nw(dispatch, pindex, tolalWeight) }
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
    tolalWeight: PropTypes.number
}

export default PostCostButton