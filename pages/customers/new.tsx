import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import {
  indexUrl,
  objectFormConfig
} from '../../src/components/customers/config'
import Layout from '../../src/components/layout/Layout'
import Form from '../../src/components/objectForm/Form'
import { getOptions } from '../../src/components/options/apiSlice'
import { wrapper } from '../../src/components/store'
import { getUser } from '../../src/components/users/apiSlice'
import { getRunningOperationPromises } from '../../src/services/apiSlice'

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(({ dispatch }) => async () => {
    dispatch(getOptions.initiate(indexUrl))
    dispatch(getUser.initiate())
    await Promise.all(getRunningOperationPromises())
    return {
      props: {},
    }
  })

const NewObject: NextPage = () => <Layout {...{ indexUrl }}>
  <Form {...{ ...objectFormConfig, indexUrl }} />
</Layout>

export default NewObject
