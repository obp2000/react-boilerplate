import PropTypes from 'prop-types'
import React from 'react'
import {Pagination, PaginationItem} from 'reactstrap'
import {Link} from 'react-router-dom'
import {usePagination} from './hooks'

const PaginationComp = ({totalPages}) => {
  const {pages} = usePagination(totalPages)
  if (pages === []) return null
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
  totalPages: PropTypes.number,
}

export default PaginationComp
