import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import querystring from 'querystring'
import { Pagination, PaginationItem } from 'reactstrap'
import { Link, useLocation } from 'react-router-dom'
// import ActiveItem from './ActiveItem'
import { pages, selectTableSlice } from '../redux/Router'
import { TableName } from '../Shared/BasePathname'

const PaginationComp = ({ tableData }) => {
    const table_name = TableName(useLocation())
    // const tableData = useSelector(selectTableSlice(table_name))
    return <Pagination>
        {useSelector(pages(table_name, tableData)).map(({
            active,
            to,
            label}, key) =>
            <PaginationItem {...{active, key}} >
                <Link {...{to}} className="page-link">
                    {label}
                </Link>
            </PaginationItem>
            )}
    </Pagination>
}

export default PaginationComp
