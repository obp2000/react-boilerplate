import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import FormTemplate from '../CustomerForm'
import { getObjectAction, onSubmitAction } from '../../redux/ServerActions'
import { Actions } from '../../redux/Customers'

class Customer extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    componentDidMount() {
        console.log('customer DidMount')
        this.props.getObjectAction()
    }

    render() {
        return <FormTemplate {...this.props} />
    }
}

const mapStateToProps = ({
    temp_state: {
        isFetching
    },
}) => ({
    isFetching,
})

export default connect(mapStateToProps, {
    getObjectAction: getObjectAction(Actions),
    onSubmitAction: onSubmitAction(Actions)
})(Customer)
