import React from 'react'
import { connect } from 'react-redux'
import Template from '../CustomerRow'
import { deleteObjectAction } from '../../redux/Customers'

export default connect(null, { deleteObjectAction })(Template)