/* global Promise*/
/* eslint no-undef: "error"*/
import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { selectAuth } from '../components/auth/selectors'
import { objectsTableConfig } from '../components/customers/config'
import { url as indexUrl } from '../components/customers/apiSlice'
import Layout from '../components/layout/Layout'
import ObjectsTable from '../components/objectsTable/ObjectsTable'
import { getOptions } from '../components/options/apiSlice'
import { wrapper } from '../services/store'
import { getUser } from '../components/users/apiSlice'
import { getRunningOperationPromises } from '../services/apiSlice'

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(({ dispatch, getState }) => async ({ query }) => {
    dispatch(getOptions.initiate(indexUrl))
    dispatch(objectsTableConfig.getObjects.initiate(query))
    const { isAuthenticated } = selectAuth(getState())
    if (isAuthenticated) {
      dispatch(getUser.initiate())
    }
    await Promise.all(getRunningOperationPromises())
    return {
      props: {},
    }
  })

const Home: NextPage = () => <Layout {...{ indexUrl }}>
  <ObjectsTable {...objectsTableConfig} />
</Layout>

export default Home


// import { GetStaticProps } from 'next'

// export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
//   ({ dispatch }) => async (context) => {
//     // console.log('context...............', context)
//     // console.log('store...............', store)
//     // dispatch(getOptions.initiate(objectsTableConfig.indexUrl))
//     // dispatch(objectsTableConfig.getObjects.initiate({}))
//     // const {isAuthenticated} = selectAuth(store.getState())
//     // console.log('isAuthenticated...............', isAuthenticated)
//     // if (isAuthenticated) {
//     //   dispatch(getUser.initiate())
//     // }
//     // await Promise.all(getRunningOperationPromises())
//     return {
//       props: {},
//     }
//   }
// )
