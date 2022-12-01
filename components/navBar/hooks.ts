import { useSelectedLayoutSegment } from 'next/navigation'

export const useMainMenuItemClassName = (path: string | undefined): string => {
  const segment = useSelectedLayoutSegment()
  const isActive = (path === '/' && segment == '(main)') ||
    (path === `/${segment}/`)
  return `nav-link${isActive ? ' active' : ''}`
}
