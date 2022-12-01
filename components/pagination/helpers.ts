import 'server-only'

import type { Page, TotalPages } from '@/interfaces/pagination'
import type { SearchParams } from '@/interfaces/api'

export const getPagination = ({
  totalPages,
  searchParams = {}
}: TotalPages & SearchParams): Page[] => {
  const { page, ...rest } = searchParams
  const currentPage = parseInt(page || '1')
  const setQuery = (page: number) => ({ page: String(page), ...rest })
  const pages: Page[] = []
  if (currentPage > 1) {
    pages.push({
      label: '<',
      query: currentPage === 2 ? rest : setQuery(currentPage - 1),
      // search: currentPage === 2 ? deletePage() : setPage(currentPage - 1),
    })
  }
  if (totalPages > 1) {
    Array(totalPages).fill('').reduce((page) => {
      pages.push({
        label: page,
        query: page === 1 ? rest : setQuery(page),
        // search: page === 1 ? deletePage() : setPage(page),
        active: page === currentPage,
      })
      return page + 1
    }, 1)
  }
  if (currentPage < totalPages) {
    pages.push({
      label: '>',
      query: setQuery(currentPage + 1)
      // search: setPage(currentPage + 1),
    })
  }
  return pages
}
