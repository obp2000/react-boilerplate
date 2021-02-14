import {
    reduxForm
} from 'redux-form'
import {
    connect
} from 'react-redux'
import {
    push
} from 'connected-react-router'
import SearchForm from '../SearchForm'

const validate = ({
    term
}) => {
    const errors = {}
    const blankErrorText = ''
    if (!term) {
        errors.term = blankErrorText
    }
    return errors
}

const onSubmit = ({
    term
}, dispatch, {
    table
}) => dispatch(push(`/${table}?term=${term}`))
    // dispatch(push('/' + table + '?term=' + decodeURIComponent(term)))

const mapStateToProps = ({
    router: {
        location: {
            query: {
                term = ''
            },
            search
        }
    }
}) => ({
    initialValues: {
        term: decodeURIComponent(term)
        // term
    },
})

export default connect(mapStateToProps)(reduxForm({
    form: 'search',
    validate,
    onSubmit,
    // enableReinitialize: true
})(SearchForm))
