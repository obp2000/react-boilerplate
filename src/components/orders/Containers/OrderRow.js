import React from 'react'
import { connect } from 'react-redux'
import Template from '../OrderRow'
import { deleteObjectAction } from '../../redux/Orders'
import {mapRowStateToProps} from '../../redux/mappers'

export default connect(mapRowStateToProps, {
    deleteObjectAction
})(Template)