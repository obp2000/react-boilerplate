import React, {ReactNode} from 'react'
import Head from "next/head"
// import {useRouter} from "next/dist/client/router"
import {Container} from 'reactstrap'
import {ToastContainer} from 'react-toastify'
// import Loader from 'react-loader'
import NavBar from '../NavBar/navBar'
import AuthModal from '../auth/AuthModal'
// import {selectAuth} from '../src/components/auth/selectors'
// import {useOptionsOuery} from '../src/components/options/hooks'
import {useAppSelector} from '../hooks'
import {selectAuth} from '../auth/selectors'

type Props = {
  indexUrl: string
  children?: ReactNode
}

const name = "Best&C"

const Layout = ({indexUrl, children}: Props) => {
  // const {isAuthenticated} = useLayout({indexUrl})
  const {isAuthenticated} = useAppSelector(selectAuth)
  console.log('isAuthenticated ', isAuthenticated)
  // if (isLoadingOptions) {return <Loader />}
  return <Container fluid="sm" className="bg-light border mt-2">
      <Head>
        <title>{name}</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content={name} />
        <meta name='X-UA-Compatible' httpEquiv='X-UA-Compatible'
          content='ie=edge' />
        <meta name='theme-color' content ='#000000' />
      </Head>
      <header>
        <NavBar {...{indexUrl}} />
      </header>
      <main>
        {children}
      </main>
      {!isAuthenticated && <AuthModal {...{indexUrl}} />}
      <ToastContainer />
    </Container>
}

export default Layout
