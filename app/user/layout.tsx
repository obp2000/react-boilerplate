import NavBar from '@/navBar/NavBar'
import { ReactNode } from 'react'
import { indexUrl } from './serverConfig'

export default function Layout({ children }: { children: ReactNode }) {
  return <>
    <header>
      <NavBar {...{ indexUrl, auth: true }} />
    </header>
    <main>
      {children}
    </main>
  </>
}
