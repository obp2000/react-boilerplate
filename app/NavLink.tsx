'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function NavLink({
  path,
  lng,
  children
}: { path: string, lng: string, children: string }) {
  const segment = useSelectedLayoutSegment()
  const currentPath = segment === '(main)' ? '/' : `/${segment}/`
  const isActive = path === currentPath
  return <Link
    href={`/${lng}${path}`}
    prefetch={false}
    // className={clsx('block py-2 pr-4 pl-3 md:p-0', {
    //   "bg-blue-700 text-white dark:text-white md:bg-transparent md:text-blue-700":
    //     path === currentPath,
    //   "border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white":
    //     path !== currentPath,
    className={clsx('mt-2 mr-1 rounded-lg px-2 py-1 text-sm font-medium', {
      'bg-gray-700 text-gray-100 hover:bg-gray-500 hover:text-white': !isActive,
        'bg-blue-600 text-white': isActive,
    })}
  >
    {children}
  </Link>
}
