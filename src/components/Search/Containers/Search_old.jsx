import {
    connect
} from 'react-redux'
import SearchForm from './SearchForm'

function mapStateToProps(state) {
    const {
        router: {
            location: {
                pathname,
                search
            }
        }
    } = state
    const base = pathname.replace(/\/pages\/\d+$/gi, '')
    const table = base.replace(/^\//gi, '')
    return {
        search,
        table
    }
}

export default connect(mapStateToProps)(SearchForm)