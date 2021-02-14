import {
    connect
} from 'react-redux'
import Pagination from '../Pagination'

function mapStateToProps(state, {
    match: {
        params: {
            page = '1'
        },
        path
    }
}) {
    const {
        router: {
            location: {
                search
            }
        }
    } = state
    const table = path.split('/')[1] || 'products'
    console.log('table: ', table)
    // const base = `/${table}/pages/`
    const {
        totalPages
    } = state[table || 'products']
    return {
        page: parseInt(page),
        totalPages,
        search,
        table
        // base
    }
}

export default connect(mapStateToProps)(Pagination)