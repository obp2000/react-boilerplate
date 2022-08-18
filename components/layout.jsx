import PropTypes from 'prop-types'
import Head from "next/head"
import Image from "next/image"
import {useRouter} from "next/dist/client/router"
import {useSelector} from 'react-redux'
import {Container} from 'reactstrap'
import {ToastContainer} from 'react-toastify'
// import styles from "./layout.module.css";
// import utilStyles from "../styles/utils.module.css";
import Link from "next/link"
// import Loader from 'react-loader'
import NavBar from '../src/components/NavBar/navBar'
import AuthModal from '../src/components/auth/AuthModal'
import {selectAuth} from '../src/components/auth/selectors'
import {useOptionsOuery} from '../src/components/options/hooks'

const name = "Best&C"

export default function Layout({
  indexUrl,
  children,
}) {
  // console.log({props})
  const {isAuthenticated} = useSelector(selectAuth)
  const {isLoadingOptions, ...props} = useOptionsOuery(indexUrl)
  const router = useRouter()
  const {isFallback} = router
  // if (isFallback || isLoadingOptions) {return <Loader />}
  return (
    <Container fluid="sm" className="bg-light border mt-2">
      <Head>
        <title>{name}</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content={name} />
        <meta name='X-UA-Compatible' httpEquiv='X-UA-Compatible'
          content='ie=edge' />
        <meta name='theme-color' content ='#000000' />
      </Head>
      <header>
        <NavBar {...props} />
      </header>
      <main>
        {children}
      </main>
      {!isAuthenticated && <AuthModal {...props} />}
      <ToastContainer />
    </Container>
  )
}

Layout.propTypes = {
  indexUrl: PropTypes.string,
  children: PropTypes.object,
}
