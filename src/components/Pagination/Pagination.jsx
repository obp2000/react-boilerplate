import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import querystring from 'querystring'
import { Pagination } from 'reactstrap'
import PageItem from './PageItem'

const PaginationComp = ({ totalPages }) => {
    // console.log('pathname ', pathname)
    const loaded = useSelector(({
        router: {
            location: {
                pathname,
                query: {
                    page = 1,
                    term
                } = {}
            }
        }
    }) => ({
        pathname,
        page,
        term
    }))
    // const { page } = loaded.query
    const currentPage = parseInt(loaded.page)
    return <Pagination>
        {currentPage > 1 && <PageItem {...{
                            label: '<',
                            to: {
                                pathname: loaded.pathname,
                                search: querystring.stringify({
                                    ...(currentPage == 2 ? {} : {page: currentPage - 1}),
                                    ...(loaded.term ? {term: loaded.term} : {})
                                })
                            },
                            key: -1,
                            }}
                        />
        }
        {Array(totalPages).fill().map((_, index) =>
                    <PageItem {...{
                        label: (index + 1).toString(),
                        to: {
                            pathname: loaded.pathname,
                            search: querystring.stringify({
                                ...(index == 0 ? {} : {page: index + 1}),
                                ...(loaded.term ? {term: loaded.term} : {})
                            })
                        },
                        active: (index + 1) == currentPage,
                        key: index,
                        }}
                    />)
        }
        {currentPage < totalPages && <PageItem {...{
                                label: '>',
                                to: {
                                    pathname: loaded.pathname,
                                    search: querystring.stringify({
                                        page: currentPage + 1,
                                        ...(loaded.term ? {term: loaded.term} : {})
                                    })
                                },
                                key: -2,
                                }}
                            />
        }
    </Pagination>
}

Pagination.propTypes = {
    totalPages: PropTypes.number
}

export default PaginationComp