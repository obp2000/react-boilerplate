import Head from 'next/head'
import Layout from '../../components/layout'
import {getOptions} from '../../src/components/options/apiSlice'
import {getRunningOperationPromises} from '../../src/services/apiSlice'
import {wrapper} from '../../src/components/Store'
import ObjectsTable from '../../src/components/objectsTable/ObjectsTable'
import {
  useOrdersTable as useObjectsTable,
  indexUrl,
} from '../../src/components/orders/hooks'
import {
  getOrders as getObjects,
} from '../../src/components/orders/apiSlice'
import {getUser} from '../../src/components/users/apiSlice'
import {selectAuth} from '../../src/components/auth/selectors'

export const getServerSideProps = wrapper.getServerSideProps(
    ({dispatch, getState}) => async ({query}) => {
      dispatch(getOptions.initiate(indexUrl))
      dispatch(getObjects.initiate(query))
      const {isAuthenticated} = selectAuth(getState())
      if (isAuthenticated) {
        dispatch(getUser.initiate())
      }
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
      <ObjectsTable {...useObjectsTable()} />
    </Layout>
  )
}
