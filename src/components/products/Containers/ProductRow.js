import React from 'react'
import { connect } from 'react-redux'
import Template from '../ProductRow'
import { deleteObjectAction } from '../../redux/Products'

export default connect(null, { deleteObjectAction })(Template)