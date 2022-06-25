import PropTypes from 'prop-types'
import React from 'react'
import {Pagination, PaginationItem} from 'reactstrap'
import {useSearchParams, createSearchParams, Link} from 'react-router-dom'
// import PaginationItem from './PaginationItem'

const PaginationComp = ({totalPages = 0}) => {
  const [searchParams] = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || 1)
  const urlSearchParams = createSearchParams(searchParams)
  const setSearch = (page) => {
        page ?  urlSearchParams.set('page', page) :
                urlSearchParams.delete('page')
        return urlSearchParams.toString()
  }
  // const {totalPages = 0} = tableData
  const pages = []
  if (currentPage > 1) {
    pages.push({
      label: '<',
      search: setSearch(currentPage == 2 ? null : currentPage - 1),
    })
  }
  if (totalPages > 1) {
    Array(totalPages).fill().reduce((page, index) => {
      pages.push({
        label: page,
        search: setSearch(page == 1 ? null : page),
        active: page == currentPage,
      })
      return page + 1
    }, 1)
  }
  if (currentPage < totalPages) {
    pages.push({
      label: '>',
      search: setSearch(currentPage + 1),
    })
  }
  if (pages == []) return null
  return <Pagination>
    {pages.map(({label, search, active}, key) =>
      <PaginationItem {...{active, key}} >
        <Link to={{search}} className="page-link">
          {label}
        </Link>
      </PaginationItem>)}
  </Pagination>
}

PaginationComp.propTypes = {
  tableData: PropTypes.object,
}

export default PaginationComp
