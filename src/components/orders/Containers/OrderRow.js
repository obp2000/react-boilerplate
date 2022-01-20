import React from 'react'
import { connect } from 'react-redux'
import Template from '../OrderRow'
import { deleteObjectAction } from '../../redux/Orders'

export default connect(null, { deleteObjectAction })(Template)