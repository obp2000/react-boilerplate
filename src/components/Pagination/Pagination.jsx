import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import querystring from 'querystring'
import { Pagination } from 'reactstrap'
import PageItem from './PageItem'
import { selectPathname, selectPage, selectTerm } from '../redux/Router'

const PaginationComp = ({
    totalPages,
    // pathname,
    // query: {
    //     // page = 1,
    //     term
    // }
}) => {
    // console.log('pathname ', pathname)
    // const loaded = useSelector(({
    //     router: {
    //         location: {
    //             pathname,
    //             query: {
    //                 page = 1,
    //                 term
    //             } = {}
    //         }
    //     }
    // }) => ({
    //     pathname,
    //     page,
    //     term
    // }))
    // const { page } = loaded.query
    const pathname = useSelector(selectPathname)
    const page = useSelector(selectPage)
    const currentPage = parseInt(page)
    const term = useSelector(selectTerm)
    const term_obj = term ? {term} : {}
    return <Pagination>
        {currentPage > 1 && <PageItem {...{
                            label: '<',
                            to: {
                                pathname,
                                search: querystring.stringify({
                                    ...(currentPage == 2 ? {} : {page: currentPage - 1}),
                                    ...term_obj
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
                            pathname,
                            search: querystring.stringify({
                                ...(index == 0 ? {} : {page: index + 1}),
                                ...term_obj
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
                                    pathname,
                                    search: querystring.stringify({
                                        page: currentPage + 1,
                                        ...term_obj
                                    })
                                },
                                key: -2,
                                }}
                            />
        }
    </Pagination>
}

Pagination.propTypes = {
    totalPages: PropTypes.number,
    pathname: PropTypes.string,
    page: PropTypes.string,
    term: PropTypes.string
}

export default PaginationComp