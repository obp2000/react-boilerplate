import React from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { Form } from 'react-final-form'
import type { NextPage } from 'next'
import Layout from '../../src/components/layout/Layout'
import { getOptions } from '../../src/components/options/apiSlice'
import { getRunningOperationPromises } from '../../src/services/apiSlice'
import { wrapper } from '../../src/components/store'
import { objectFormConfig } from '../../src/components/products/hooks'
import { getProduct as getObject } from '../../src/components/products/apiSlice'
import { getUser } from '../../src/components/users/apiSlice'
import {
  useTestObjectId,
  useObjectForm
} from '../../src/components/objectForm/hooks'

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
  }
  )

const EditObject: NextPage = () => <Layout indexUrl={objectFormConfig.indexUrl}>
  {/* <Head>
        <title>Best&C</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>*/}
  <Form {...useObjectForm(objectFormConfig)} />
</Layout>

export default EditObject
