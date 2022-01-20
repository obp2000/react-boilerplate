import React from 'react'
import { connect } from 'react-redux'
import Template from '../OrderNumber'

const mapStateToProps = ({
    orders: {
        object: {
            created_at,
            id
        }
    }
}) => ({
    created_at,
    id
})

export default connect(mapStateToProps)(Template)