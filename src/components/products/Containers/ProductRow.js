import React from 'react'
import { connect } from 'react-redux'
import Template from '../ProductRow'
import { deleteObjectAction } from '../../redux/Products'
import {mapRowStateToProps} from '../../redux/mappers'

export default connect(mapRowStateToProps, {
    deleteObjectAction
})(Template)