import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Template from '../LoginForm'
import { getOptions, onSubmitLogin } from '../../redux/auth'

class LoginForm extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    componentDidMount() {
        console.log('LoginDidMount')
        this.props.getOptions()
    }

    render() {
        return <Template {...this.props} />
    }
}

export default connect(null, {
    getOptions: getOptions(true),
    onSubmitLogin
})(LoginForm)
