import Head from 'next/head'
import {getOptions} from '../../src/components/options/apiSlice'
import {getRunningOperationPromises} from '../../src/services/apiSlice'
import {wrapper} from '../../src/components/Store'
import User from '../../src/components/users/User'
import {
  indexUrl,
  useUser
} from '../../src/components/users/hooks'
// import {
//   getCustomers as getObjects
// } from '../../src/components/customers/apiSlice'
import {getUser} from '../../src/components/users/apiSlice'
import {selectAuth} from '../../src/components/auth/selectors'

export const getServerSideProps = wrapper.getServerSideProps(
    ({dispatch, getState}) => async (context) => {
      const {isAuthenticated} = selectAuth(getState())
      if (isAuthenticated) {
        dispatch(getOptions.initiate(indexUrl))
        dispatch(getUser.initiate())
      } else {
        return {notFound: true}
      }
      await Promise.all(getRunningOperationPromises())
      return {
        props: {},
      }
    }
)

export default function Home() {
  return (
    <>
      {/*      <Head>
        <title>Best&C</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>*/}
      <User {...useUser()} />
    </>
  )
}
