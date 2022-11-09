// import { useRouter } from 'next/dist/client/router'

// export const useMainMenuItemClassName = (path: string | undefined): string => {
//   const { pathname } = useRouter()
//   return `nav-link${(pathname === path) ||
//     (`${pathname}/` === path) ? ' active' : ''}`
// }

import { useSelectedLayoutSegments } from 'next/navigation'

export const useMainMenuItemClassName = (path: string | undefined): string => {
  const [firstSegment] = useSelectedLayoutSegments()
  // console.log('path ', path, firstSegment)
  const isActive = path === (firstSegment ? `/${firstSegment}/` : '/')
  return `nav-link${isActive ? ' active' : ''}`
}