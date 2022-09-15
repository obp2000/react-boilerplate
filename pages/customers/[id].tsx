import React from 'react'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps, GetServerSideProps } from 'next'
import { Form } from 'react-final-form'
import type { NextPage } from 'next'
import { createSelector } from '@reduxjs/toolkit'
import type { EntityId, Dictionary, } from '@reduxjs/toolkit'
import Layout from '../../src/components/layout/Layout'
import { getOptions } from '../../src/components/options/apiSlice'
import { getRunningOperationPromises } from '../../src/services/apiSlice'
import { wrapper } from '../../src/components/store'
import { objectFormConfig } from '../../src/components/customers/hooks'
import {
  getCustomers as getObjects,
  getCustomer as getObject
} from '../../src/components/customers/apiSlice'
import { getUser } from '../../src/components/users/apiSlice'
import {
  useTestObjectId,
  useObjectForm
} from '../../src/components/objectForm/hooks'
import { makeStore } from '../../src/components/store'
import { getSelectors } from '../../src/services/entityAdapter'

// export const getStaticPaths: GetStaticPaths = async () => {
//   const { dispatch, getState } = makeStore()
//   await dispatch(getObjects.initiate({}))
//   const selectObjectsResult = getObjects.select({})
//   const selectObjectsData =
//     createSelector([selectObjectsResult], ({ data }) => data)
//   const { selectAll } = getSelectors(selectObjectsData)
//   const allObjects = selectAll(getState())
//   const paths = allObjects.map(({ id }) => ({
//     params: {
//       id: id.toString()
//     }
//   }))
//   // console.log('paths....................... ', paths)
//   return { paths, fallback: true, }
// }

// export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
//   ({ dispatch }) => async ({ params }) => {
//     // console.log('context...............', context)
//     const id = params?.id
//     if (useTestObjectId(id)) {
//       const { isError } = await dispatch(getObject.initiate({ id: Number(id) }))
//       if (isError) { return { notFound: true } }
//     } else {
//       return { notFound: true }
//     }
//     dispatch(getOptions.initiate(objectFormConfig.indexUrl))
//     // dispatch(getUser.initiate())
//     await Promise.all(getRunningOperationPromises())
//     return { props: {} }
//   }
// )

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(({ dispatch }) => async ({ params }) => {
    const id = params?.id
    if (useTestObjectId(id)) {
      dispatch(getObject.initiate({ id: Number(id) }))
    } else {
      return { notFound: true }
    }
    dispatch(getOptions.initiate(objectFormConfig.indexUrl))
    dispatch(getUser.initiate())
    await Promise.all(getRunningOperationPromises())
    return {
      props: {},
    }
  })

const EditObject: NextPage = () => <Layout indexUrl={objectFormConfig.indexUrl}>
  {/* <Head>
        <title>Best&C</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>*/}
  <Form {...useObjectForm(objectFormConfig)} />
</Layout>

export default EditObject
