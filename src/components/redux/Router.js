import { createSelector } from 'reselect'
import querystring from 'querystring'
import { selectTableValues as selectCustomersTableValues } from './Customers'
import { selectTableValues as selectProductsTableValues } from './Products'
import { selectTableValues as selectOrdersTableValues } from './Orders'

export const selectSlice = ({ router }) => router

export const selectLocation = createSelector([selectSlice],
    ({ location }) => location
)

const tableValues = {
    customers: results => selectCustomersTableValues(results),
    products: results => selectProductsTableValues(results),
    orders: results => selectOrdersTableValues(results)
}

export const selectTableValues = (tableName, { results = [] }) =>
    createSelector([tableValues[tableName](results)],
        values => ({ values })
    )

export const selectTableSlice = tableName => state => state[tableName]

export const pages = (tableName, { totalPages = 0 }) =>
    createSelector([ selectLocation ],
        ({
            pathname,
            query: {
                page = 1,
                term
            } = {}
        }) => {
            const currentPage = parseInt(page)
            const term_obj = term ? { term } : {}
            let pages = []
            if (currentPage > 1) pages.push({
                label: '<',
                to: {
                    pathname,
                    search: querystring.stringify({
                        ...(currentPage == 2 ? {} : { page: currentPage - 1 }),
                        ...term_obj
                    })
                }
            })
            if (totalPages > 1) {
                Array(totalPages).fill().map((_, index) => pages.push({
                    label: (index + 1).toString(),
                    to: {
                        pathname,
                        search: querystring.stringify({
                            ...(index == 0 ? {} : { page: index + 1 }),
                            ...term_obj
                        })
                    },
                    active: (index + 1) == currentPage,
                }))
            }
            if (currentPage < totalPages) pages.push({
                label: '>',
                to: {
                    pathname,
                    search: querystring.stringify({
                        page: currentPage + 1,
                        ...term_obj
                    })
                }
            })
            return pages
        }
    )

export const getTableLabels = (
    field_names,
    options
) => field_names.reduce(
        (result, field_name) => {
            result.push(options[field_name]?.label)
            return result
        },
        [])
