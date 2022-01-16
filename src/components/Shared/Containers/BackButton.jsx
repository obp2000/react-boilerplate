import React from 'react'
import { connect } from 'react-redux'
import { goBack } from 'connected-react-router'
import Template from '../BackButton'

export default connect(null, {
    goBack
})(Template)