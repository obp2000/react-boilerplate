import React from 'react'
import { connect } from 'react-redux'
import Template from '../PostCostButton'
import { getPostCost } from '../../redux/PostCost'

export default connect(null, {
    getPostCost
})(Template)