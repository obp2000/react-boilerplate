import Head from 'next/head'
import Layout from '../../src/components/layout/layout'
import {getOptions} from '../../src/components/options/apiSlice'
import {getRunningOperationPromises} from '../../src/services/apiSlice'
import {wrapper} from '../../src/components/Store'
import ObjectsTable from '../../src/components/objectsTable/ObjectsTable'
import {objectsTableConfig} from '../../src/components/products/hooks'
import {getProducts as getObjects} from '../../src/components/products/apiSlice'
import {getUser} from '../../src/components/users/apiSlice'
import {selectAuth} from '../../src/components/auth/selectors'

export const getServerSideProps = wrapper.getServerSideProps(
    ({dispatch, getState}) => async ({query}) => {
      dispatch(getOptions.initiate(objectsTableConfig.indexUrl))
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
    <Layout indexUrl={objectsTableConfig.indexUrl}>
      {/* <Head>
            <title>Best&C</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>*/}
      <ObjectsTable {...objectsTableConfig} />
    </Layout>
  )
}
