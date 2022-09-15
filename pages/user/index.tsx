import React from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import type { NextPage } from 'next'
import Layout from '../../src/components/layout/Layout'
import { getOptions } from '../../src/components/options/apiSlice'
import { getRunningOperationPromises } from '../../src/services/apiSlice'
import { wrapper } from '../../src/components/store'
import User from '../../src/components/users/User'
import { indexUrl, } from '../../src/components/users/hooks'
// import {
//   getCustomers as getObjects
// } from '../../src/components/customers/apiSlice'
import { getUser } from '../../src/components/users/apiSlice'
import { selectAuth } from '../../src/components/auth/selectors'

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(({ dispatch, getState }) => async () => {
    const { isAuthenticated } = selectAuth(getState())
    if (isAuthenticated) {
      dispatch(getOptions.initiate(indexUrl))
      dispatch(getUser.initiate())
    } else {
      return { notFound: true }
    }
    await Promise.all(getRunningOperationPromises())
    return {
      props: {},
    }
  }
  )

const Home: NextPage = () => <Layout indexUrl={indexUrl}>
  {/* <Head>
        <title>Best&C</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>*/}
  <User />
</Layout>

export default Home
