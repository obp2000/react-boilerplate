import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'reactstrap'

const PostCostButton = ({
    getPostCost,
    pindex,
    tolalWeight
}) => <Button
            name='post_cost_button'
            // onClick = {() => getPostCost(pindex, tolalWeight) }
            type = "button"
            color = "primary"
            outline
            size = "sm"
            disabled = {!pindex || !tolalWeight }
            >
            Рассчитать
        </Button>

PostCostButton.propTypes = {
    getPostCost: PropTypes.func.isRequired,
    pindex: PropTypes.string,
    tolalWeight: PropTypes.number
}

export default PostCostButton