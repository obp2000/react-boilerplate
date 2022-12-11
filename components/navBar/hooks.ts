import type { MainMenuItem } from '@/interfaces/commonConsts'
import clsx from 'clsx'
import { useSelectedLayoutSegments } from 'next/navigation'

export function useNavLink({ path, label }: MainMenuItem) {
  const [firstSelectedLayoutSegment] = useSelectedLayoutSegments()
  const currentPath = firstSelectedLayoutSegment
    ? `/${firstSelectedLayoutSegment}/`
    : '/'
  return {
    href: path,
    prefetch: false,
    // shallow={true}
    className: clsx('nav-link', { active: path === currentPath }),
    children: label
  }
}


// import { useSelectedLayoutSegment } from 'next/navigation'

// export const useMainMenuItemClassName = (path: string | undefined): string => {
//   const segment = useSelectedLayoutSegment()
//   const isActive = (path === '/' && segment == '(main)') ||
//     (path === `/${segment}/`)
//   return `nav-link${isActive ? ' active' : ''}`
// }
