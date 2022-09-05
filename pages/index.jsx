import Head from 'next/head'
import Layout from '../../src/components/layout/layout'
import {getOptions} from '../src/components/options/apiSlice'
import {getRunningOperationPromises} from '../src/services/apiSlice'
import {wrapper} from '../src/components/Store'
import ObjectsTable from '../src/components/objectsTable/ObjectsTable'
import {objectsTableConfig} from '../src/components/customers/hooks'
import {getCustomers as getObjects} from '../src/components/customers/apiSlice'
import {getUser} from '../src/components/users/apiSlice'
import {selectAuth} from '../src/components/auth/selectors'

/* global Promise*/
/* eslint no-undef: "error"*/

export const getStaticProps = wrapper.getStaticProps(
    ({dispatch}) => async (context) => {
      // console.log('context...............', context)
      // console.log('store...............', store)
      // dispatch(getOptions.initiate(objectsTableConfig.indexUrl))
      // dispatch(getObjects.initiate({}))
      // const {isAuthenticated} = selectAuth(store.getState())
      // console.log('isAuthenticated...............', isAuthenticated)
      // if (isAuthenticated) {
      //   dispatch(getUser.initiate())
      // }
      // await Promise.all(getRunningOperationPromises())
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
