import 'server-only'

// import Badge from '@/client/Badge'
import { ReactNode } from 'react'

export default function Header({
  totalCount,
  label,
  children
}: { totalCount: number, label: string, children: ReactNode }) {
  return <div className='columns-3'>
    <div className='text-center text-2xl text-gray-900'>
      <h1>{label} ({totalCount})</h1>
    </div>
    {children}
  </div>
}

{/*<h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
<span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
Better Data
</span>Scalable AI.
</h1>*/}