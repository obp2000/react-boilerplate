import {useRouter} from 'next/dist/client/router'

export const usePagination = ({totalPages}) => {
  const router = useRouter()
  const {query} = router
  const search = new URLSearchParams(query)
  const currentPage = parseInt(search.get('page') || 1)
  const setSearch = (page) => {
        page ?
        search.set('page', page) :
        search.delete('page')
        // let query = {}
        // for (const [key, value] of search.entries()) {
        //   query[key] = value
        // }
        return search.toString()
  }
  const pages = []
  if (currentPage > 1) {
    pages.push({
      label: '<',
      search: setSearch(currentPage === 2 ? null : currentPage - 1),
    })
  }
  if (totalPages > 1) {
    Array(totalPages).fill().reduce((page) => {
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
  return pages
}
