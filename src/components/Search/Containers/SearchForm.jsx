import { connect } from 'react-redux'
// import { push } from 'connected-react-router'
import SearchForm from '../SearchForm'
// import { mapSearchStateToProps } from '../../redux/mappers'
import { submitAction } from '../../redux/Search'

// const onSubmit = ({
//     term
// }, dispatch, {
//     table
// }) => dispatch(push(`/${table}?term=${term}`))
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
    }
})

export const mapDispatchToProps = (dispatch, { table }) =>
    ({
        onSubmit: ({ term }) => dispatch(submitAction(term, table))
    })

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)