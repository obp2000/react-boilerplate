import { useRouter } from 'next/dist/client/router'

export const useMainMenuItemClassName = (path: string | undefined): string => {
  const { pathname } = useRouter()
  return `nav-link${(pathname === path) ||
    (`${pathname}/` === path) ? ' active' : ''}`
}
