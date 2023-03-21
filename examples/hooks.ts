// import { useSelectedLayoutSegments } from 'next/navigation'
import { ParsedUrlQuery } from 'querystring'

// export const getPagination = ({
//   totalPages,
//   searchParams: {
//     page = '1',
//     ...restSearchParams
//   }
// }: { totalPages: number, searchParams: ParsedUrlQuery }) => {
//   // const [_, page = '1'] = useSelectedLayoutSegments()
//   // const basePathname = `/${lng}${indexUrl}`
//   const pages = []
//   const currentPage = parseInt(String(page))
//   // if (currentPage > 1) {
//   pages.push({
//     label: '<',
//     // pathname: currentPage === 2 ? basePathname : `${basePathname}page/${currentPage - 1}`,
//     query: currentPage < 3 ? restSearchParams : { page: String(currentPage - 1), ...restSearchParams },
//     className: "px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
//   })
//   // }
//   if (totalPages > 1) {
//     Array(totalPages).fill('').reduce((page) => {
//       pages.push({
//         label: page,
//         // pathname: page === 1 ? basePathname : `${basePathname}page/${page}`,
//         query: page === 1 ? restSearchParams : { page: String(page), ...restSearchParams },
//         active: page === currentPage,
//         className: page === currentPage
//           ? "px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
//           : "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
//       })
//       return page + 1
//     }, 1)
//   }
//   if (currentPage <= totalPages) {
//     pages.push({
//       label: '>',
//       // pathname: `${basePathname}page/${currentPage + 1}`,
//       query: { page: String(currentPage + 1), ...restSearchParams },
//       className: "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
//     })
//   }
//   return pages
// }



// export const usePagination1 = ({ totalPages }: TotalPages): Page[] => {
//   const searchParams = {} as Record<string, string>
//   useSearchParams().forEach((value, key) => {
//     searchParams[key] = value
//   })
//   const { page, ...rest } = searchParams
//   const currentPage = parseInt(page || '1')
//   const setQuery = (page: number) => ({ page: String(page), ...rest })
//   const pages: Page[] = []
//   if (currentPage > 1) {
//     pages.push({
//       label: '<',
//       query: currentPage === 2 ? rest : setQuery(currentPage - 1),
//       // search: currentPage === 2 ? deletePage() : setPage(currentPage - 1),
//     })
//   }
//   if (totalPages > 1) {
//     Array(totalPages).fill('').reduce((page) => {
//       pages.push({
//         label: page,
//         query: page === 1 ? rest : setQuery(page),
//         // search: page === 1 ? deletePage() : setPage(page),
//         active: page === currentPage,
//       })
//       return page + 1
//     }, 1)
//   }
//   if (currentPage < totalPages) {
//     pages.push({
//       label: '>',
//       query: setQuery(currentPage + 1)
//       // search: setPage(currentPage + 1),
//     })
//   }
//   return pages
// }
