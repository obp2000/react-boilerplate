import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import querystring from 'querystring'
import { Pagination } from 'reactstrap'
import { Link, useLocation } from 'react-router-dom'
import PaginationItem from './PaginationItem'

const PaginationComp = ({ tableData }) => {
    const location = useLocation()
    const pathname = location.pathname
    const { page = 1, term } = querystring.parse(location.search.replace('?', ''))
    const currentPage = parseInt(page)
    const term_obj = term ? { term } : {}
    const { totalPages = 0 } = tableData
    return <Pagination>
        {(currentPage > 1) &&
            <PaginationItem
                label='<'
                to={{
                    pathname,
                    search: querystring.stringify({
                        ...(currentPage == 2 ? {} : { page: currentPage - 1 }),
                        ...term_obj
                    })
                }}
            />

        }
        {(totalPages > 1) &&
            Array(totalPages).fill().map((_, index) =>
                <PaginationItem
                    key={index}
                    label={(index + 1).toString()}
                    to={{
                        pathname,
                        search: querystring.stringify({
                            ...(index == 0 ? {} : { page: index + 1 }),
                            ...term_obj
                        })
                    }}
                    active={(index + 1) == currentPage}
                />)
        }
        {(currentPage < totalPages) &&
            <PaginationItem
                label='>'
                to={{
                    pathname,
                    search: querystring.stringify({
                        page: currentPage + 1,
                        ...term_obj
                        })
                    }}
            />
         }
    </Pagination>
}

export default PaginationComp
