import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import Layout from '../../src/components/layout/Layout'
import Form from '../../src/components/objectForm/Form'
import { useTestObjectId } from '../../src/components/objectForm/hooks'
import { getOptions } from '../../src/components/options/apiSlice'
import {
  indexUrl,
  objectFormConfig
} from '../../src/components/orders/config'
import { wrapper } from '../../src/components/store'
import { getUser } from '../../src/components/users/apiSlice'
import { getRunningOperationPromises } from '../../src/services/apiSlice'

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(({ dispatch }) => async ({ params }) => {
    const id = params?.id
    if (useTestObjectId(id)) {
      dispatch(objectFormConfig.getObject.initiate({ id: Number(id) }))
      // console.log('result.................', result)
    } else {
      return { notFound: true }
    }
    dispatch(getOptions.initiate(indexUrl))
    dispatch(getUser.initiate())
    await Promise.all(getRunningOperationPromises())
    return {
      props: {},
    }
  })

const EditObject: NextPage = () => <Layout {...{ indexUrl }}>
  <Form {...{ ...objectFormConfig, indexUrl }} />
</Layout>

export default EditObject
