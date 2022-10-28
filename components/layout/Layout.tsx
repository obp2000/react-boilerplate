import Head from "next/head"
import React, { FC } from 'react'
import { ToastContainer } from 'react-toastify'
import { Container } from 'reactstrap'
// import Loader from 'react-loader'
import type { CommonConstsType } from '../../interfaces/commonConsts'
import type { LayoutType } from '../../interfaces/layout'
import type { AnyOptionsType } from '../../interfaces/options'
import AuthModal from '../auth/AuthModal'
import { selectAuth } from '../auth/selectors'
import { useAppSelector } from '../../services/hooks'
import NavBar from '../navBar/NavBar'
import { useOptionsOuery } from '../options/hooks'

const name = "Best&C"

export const OptionsContext = React.createContext({
  options: undefined,
  commonConsts: undefined
} as AnyOptionsType & CommonConstsType)

const Layout: FC<LayoutType> = ({ indexUrl, children }) => {
  const { isAuthenticated } = useAppSelector(selectAuth)
  const { options, commonConsts } = useOptionsOuery(indexUrl)
  // if (isLoadingOptions) {return <Loader />}
  return <OptionsContext.Provider value={{ options, commonConsts }}>
    <Container fluid="sm" className="bg-light border mt-2">
      <Head>
        <title>{name}</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content={name} />
        <meta name='X-UA-Compatible' httpEquiv='X-UA-Compatible'
          content='ie=edge' />
        <meta name='theme-color' content='#000000' />
      </Head>
      <header>
        <NavBar />
      </header>
      <main>
        {children}
      </main>
      {!isAuthenticated && <AuthModal />}
      <ToastContainer />
    </Container>
  </OptionsContext.Provider>
}

export default Layout
