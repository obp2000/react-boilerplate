import React from 'react'
import { GetServerSideProps } from 'next'
import type { NextPage } from 'next'
import Layout from '../../src/components/layout/Layout'
import { getOptions } from '../../src/components/options/apiSlice'
import { getRunningOperationPromises } from '../../src/services/apiSlice'
import { wrapper } from '../../src/components/store'
import { objectFormConfig } from '../../src/components/products/config'
import { getProduct as getObject } from '../../src/components/products/apiSlice'
import { getUser } from '../../src/components/users/apiSlice'
import { useTestObjectId } from '../../src/components/objectForm/hooks'
import Form from '../../src/components/objectForm/Form'

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
  <Form {...objectFormConfig} />
</Layout>

export default EditObject
