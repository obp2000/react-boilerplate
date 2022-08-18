import Head from 'next/head'
import Layout from '../../components/layout'
import {getOptions} from '../../src/components/options/apiSlice'
import {getRunningOperationPromises} from '../../src/services/apiSlice'
import {wrapper} from '../../src/components/Store'
import User from '../../src/components/users/User'
import {
  // useCustomersTable as useObjectsTable,
  indexUrl,
} from '../../src/components/users/hooks'
// import {
//   getCustomers as getObjects
// } from '../../src/components/customers/apiSlice'
import {getUser} from '../../src/components/users/apiSlice'

export const getServerSideProps = wrapper.getServerSideProps(
    ({dispatch, getState}) => async (context) => {
      dispatch(getOptions.initiate(indexUrl))
      dispatch(getUser.initiate())
      await Promise.all(getRunningOperationPromises())
      return {
        props: {},
      }
    }
)

export default function Home() {
  return (
    <Layout indexUrl={indexUrl} >
      {/*      <Head>
        <title>Best&C</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>*/}
      <User />
    </Layout>
  )
}
