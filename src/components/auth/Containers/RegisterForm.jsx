import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Template from '../RegisterForm'
import { getOptions, onSubmitRegister } from '../../redux/auth'

class RegisterForm extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    componentDidMount() {
        console.log('RegisterDidMount')
        this.props.getOptions()
    }

    render() {
        return <Template {...this.props} />
    }
}

export default connect(null, {
    getOptions: getOptions(),
    onSubmitRegister
})(RegisterForm)
