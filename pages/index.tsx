import React from 'react'
import { GetServerSideProps } from 'next'
import type { NextPage } from 'next'
import Layout from '../src/components/layout/Layout'
import { getOptions } from '../src/components/options/apiSlice'
import { getRunningOperationPromises } from '../src/services/apiSlice'
import { wrapper } from '../src/components/store'
import ObjectsTable from '../src/components/objectsTable/ObjectsTable'
import { objectsTableConfig } from '../src/components/customers/config'
import { getUser } from '../src/components/users/apiSlice'
import { selectAuth } from '../src/components/auth/selectors'

/* global Promise*/
/* eslint no-undef: "error"*/

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(({ dispatch, getState }) => async ({ query }) => {
    dispatch(getOptions.initiate(objectsTableConfig.indexUrl))
    dispatch(objectsTableConfig.getObjects.initiate(query))
    const { isAuthenticated } = selectAuth(getState())
    if (isAuthenticated) {
      dispatch(getUser.initiate())
    }
    await Promise.all(getRunningOperationPromises())
    return {
      props: {},
    }
  }
  )

const Home: NextPage = () => <Layout indexUrl={objectsTableConfig.indexUrl}>
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
