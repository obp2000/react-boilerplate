import Head from 'next/head'
import Layout from '../components/layout'
import {getOptions} from '../src/components/options/apiSlice'
// import {useOptionsOuery} from '../src/components/options/hooks'
import {getRunningOperationPromises} from '../src/services/apiSlice'
import {wrapper} from '../src/components/Store'
import ObjectsTable from '../src/components/objectsTable/ObjectsTable'
import {
  useCustomersTable as useObjectsTable,
  indexUrl,
} from '../src/components/customers/hooks'
import {
  getCustomers as getObjects,
} from '../src/components/customers/apiSlice'
import {getUser} from '../src/components/users/apiSlice'
import {selectAuth} from '../src/components/auth/selectors'

/* global Promise*/
/* eslint no-undef: "error"*/

// export async function getStaticPaths() {
//   // const store = makeStore();
//   // const result = await store.dispatch(getPokemonList.initiate());

//   return {
//     paths: ['/'],
//     fallback: true,
//   }
// }

// export const getStaticPaths = async () => ({
//   paths: [],
//   fallback: 'blocking',
// })

export const getStaticProps = wrapper.getStaticProps(
    ({dispatch}) => async (context) => {
      console.log('context...............', context)
      // console.log('store...............', store)
      // store.dispatch(getOptions.initiate(indexUrl))
      // dispatch(getObjects.initiate({}))
      // const {isAuthenticated} = selectAuth(store.getState())
      // console.log('isAuthenticated...............', isAuthenticated)
      // if (isAuthenticated) {
      //   dispatch(getUser.initiate())
      // }
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
