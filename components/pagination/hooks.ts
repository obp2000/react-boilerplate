// import { useRouter } from 'next/dist/client/router'
import { useSearchParams } from 'next/navigation'
import type { Page, TotalPages } from '@/interfaces/pagination'

export const usePagination = ({ totalPages }: TotalPages): Page[] => {
  // const { query } = useRouter()
  const searchParams = new URLSearchParams(useSearchParams().toString())
  // const restSearchParams = searchParams.delete('page')
  // const { page, ...rest } = query
  // const page = searchParams.get('page') || '1'
  const currentPage = parseInt(searchParams.get('page') || '1')
  // const setQuery = (page: number) => ({ page: String(page), ...rest })
  const deletePage = () => {
    searchParams.delete('page')
    return searchParams.toString()
  }
  const setPage = (page: number) => {
    searchParams.set('page', String(page))
    return searchParams.toString()
  }
  const pages: Page[] = []
  if (currentPage > 1) {
    pages.push({
      label: '<',
      // query: currentPage === 2 ? rest : setQuery(currentPage - 1),
      search: currentPage === 2 ? deletePage() : setPage(currentPage - 1),
    })
  }
  if (totalPages > 1) {
    Array(totalPages).fill('').reduce((page) => {
      pages.push({
        label: page,
        // query: page === 1 ? rest : setQuery(page),
        search: page === 1 ? deletePage() : setPage(page),
        active: page === currentPage,
      })
      return page + 1
    }, 1)
  }
  if (currentPage < totalPages) {
    pages.push({
      label: '>',
      // query: setQuery(currentPage + 1)
      search: setPage(currentPage + 1),
    })
  }
  return pages
}
