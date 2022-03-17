import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Pagination } from 'reactstrap'
import PageItem from './PageItem'
import { TableName } from '../Shared/BasePathname'
import config from '../Config'

const PaginationComp = ({
    match: {
        params: {
            page
        }
    },
    location: {
        pathname,
        search
    }
}) => {
    const table_name = TableName(pathname) || config.BaseTable
    const pages_path = `/${table_name}/pages/`
    // console.log('table: ', table_name)
    const currentPage = parseInt(page) || 1
    const from_table = useSelector(({
        [table_name]: {
            totalPages,
        },
    }) => ({
        totalPages,
    }))
    return <Pagination>
        {currentPage > 1 && <PageItem {...{
                            label: '<',
                            to: {
                                pathname: `${pages_path}${currentPage - 1}`,
                                search
                            },
                            key: -1,
                            }}
                        />
        }
        { Array(from_table.totalPages).fill().map((_, index) =>
                    <PageItem {...{
                        label: (index + 1).toString(),
                        to: {
                            pathname: `${pages_path}${index + 1}`,
                            search
                        },
                        active: (index + 1) == currentPage,
                        key: index,
                        }}
                    />)
        }
        {currentPage < from_table.totalPages && <PageItem {...{
                                label: '>',
                                to: {
                                    pathname: `${pages_path}${currentPage + 1}`,
                                    search
                                },
                                key: -2,
                                }}
                            />
        }
    </Pagination>
}

export default PaginationComp