import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Template from '../LoginForm'
import { getOptions } from '../../redux/auth'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {
            getOptions,
        } = this.props
        console.log('LoginDidMount')
        getOptions()
    }

    render() {
        return <Template />
    }
}

export default connect(null, {
    getOptions: getOptions(true),
})(LoginForm)