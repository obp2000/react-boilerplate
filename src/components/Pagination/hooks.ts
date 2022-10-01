import { useRouter } from 'next/dist/client/router'
import type { Page, TotalPages } from '../../../interfaces'

export const usePagination = ({ totalPages }: TotalPages): Page[] => {
  const { query } = useRouter()
  const { page, ...rest } = query
  const currentPage = parseInt(String(page)) || 1
  const setQuery = (page: number) => ({ page: String(page), ...rest })
  const pages: Page[] = []
  if (currentPage > 1) {
    pages.push({
      label: '<',
      query: currentPage === 2 ? rest : setQuery(currentPage - 1),
    })
  }
  if (totalPages > 1) {
    Array(totalPages).fill('').reduce((page) => {
      pages.push({
        label: page,
        query: page === 1 ? rest : setQuery(page),
        active: page == currentPage,
      })
      return page + 1
    }, 1)
  }
  if (currentPage < totalPages) {
    pages.push({
      label: '>',
      query: setQuery(currentPage + 1)
    })
  }
  return pages
}
