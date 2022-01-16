import PropTypes from 'prop-types'
import React from 'react'
import { pages } from './Helpers'
import PageItem from './PageItem'

const Pagination = ({ table, totalPages, page, search }) =>
    <nav aria-label={`/${table} pages`}>
        <ul className="pagination">
            {pages(table, totalPages, page, search).map((page, index) =>
                <PageItem key={index} {...page} />)}
        </ul>
    </nav>

Pagination.propTypes = {
    table: PropTypes.string,
    pages: PropTypes.array,
    totalPages: PropTypes.number,
    page: PropTypes.number
}

export default Pagination