import React from 'react'
import { connect } from 'react-redux'
import Template from '../CustomerRow'
import { deleteObjectAction } from '../../redux/Customers'
import {mapRowStateToProps} from '../../redux/mappers'

export default connect(mapRowStateToProps, {
    deleteObjectAction
})(Template)