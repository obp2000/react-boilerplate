import PropTypes from 'prop-types'
import React from 'react'
import {Link, useSearchParams, createSearchParams} from 'react-router-dom'
import {PaginationItem} from 'reactstrap'
import querystring from 'querystring'

export const PaginationItemComp = ({
  active,
  page,
  label,
}) => {
  const [searchParams] = useSearchParams()
  const urlSearchParams = createSearchParams(searchParams)
    page ? urlSearchParams.set('page', page) : urlSearchParams.delete('page')
    return <PaginationItem {...{active}} >
      <Link to={{search: urlSearchParams.toString()}} className="page-link">
        {label}
      </Link>
    </PaginationItem>
}

PaginationItemComp.propTypes = {
  active: PropTypes.bool,
  page: PropTypes.number,
  label: PropTypes.string,
}

export default PaginationItemComp
