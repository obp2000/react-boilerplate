import PropTypes from 'prop-types'
import React from 'react'
import {Pagination, PaginationItem} from 'reactstrap'
import Link from 'next/link'
import {usePagination} from './hooks'

const PaginationComp = (props) => {
  const pages = usePagination(props)
  if (pages === []) return null
  // console.log({pages})
  return <Pagination>
    {pages.map(({label, search, active}, key) =>
      <PaginationItem key={key} {...{active}} >
        <Link href={{search}} shallow={true}>
          <a className='page-link'>
            {label}
          </a>
        </Link>
      </PaginationItem>)}
  </Pagination>
}

PaginationComp.propTypes = {
  props: PropTypes.object,
}

export default PaginationComp


// <Link to={{search}} className='page-link'>
//     {label}
// </Link>
