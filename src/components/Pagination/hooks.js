import React from 'react'
import {
  useSearchParams,
  createSearchParams,
} from 'react-router-dom'
// import {useObjectsData} from '../../services/entityAdapter'

export const usePagination = (totalPages) => {
  // const {getObjects} = useOutletContext()
  // const {totalPages = 0} = useObjectsData(getObjects)
  const [searchParams] = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || 1)
  const urlSearchParams = createSearchParams(searchParams)
  const setSearch = (page) => {
        page
        ? urlSearchParams.set('page', page)
        : urlSearchParams.delete('page')
        return urlSearchParams.toString()
  }
  const pages = []
  if (currentPage > 1) {
    pages.push({
      label: '<',
      search: setSearch(currentPage === 2 ? null : currentPage - 1),
    })
  }
  if (totalPages > 1) {
    Array(totalPages).fill().reduce((page, index) => {
      pages.push({
        label: page,
        search: setSearch(page === 1 ? null : page),
        active: page === currentPage,
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
  return {pages}
}
