import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Template from '../RegisterForm'
import { getOptions } from '../../redux/auth'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {
            getOptions,
        } = this.props
        console.log('RegisterDidMount')
        getOptions()
    }

    render() {
        return <Template />
    }
}

export default connect(null, {
    getOptions: getOptions(),
})(RegisterForm)