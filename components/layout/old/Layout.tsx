import Head from "next/head"
import React, { FC } from 'react'
import { ToastContainer } from 'react-toastify'
import { Container } from 'reactstrap'
// import Loader from 'react-loader'
import type { LayoutType } from '@/interfaces/layout'
import AuthModal from '@/auth/AuthModal'
import { selectAuth } from '@/auth/selectors'
import { useAppSelector } from '@/services/hooks'
import NavBar from '@/navBar/NavBar'
import { useOptionsOuery } from '@/options/hooks'
import { MainContext } from '@/services/context'

const name = "Best&C"

const Layout: FC<LayoutType> = ({ indexUrl, children }) => {
  const { isAuthenticated } = useAppSelector(selectAuth)
  const { options, commonConsts } = useOptionsOuery(indexUrl)
  // if (isLoadingOptions) {return <Loader />}
  return <Container fluid="sm" className="bg-light border mt-2">
    <Head>
      <title>{name}</title>
      <link rel="manifest" href="/manifest.json" />
      <meta name="description" content={name} />
      <meta name='X-UA-Compatible' httpEquiv='X-UA-Compatible'
        content='ie=edge' />
      <meta name='theme-color' content='#000000' />
    </Head>
    <OptionsContext.Provider value={{ options, commonConsts }}>
      <header>
        <NavBar />
      </header>
      <main>
        {children}
      </main>
      {!isAuthenticated && <AuthModal />}
      <ToastContainer />
    </OptionsContext.Provider>
  </Container>
}

export default Layout
