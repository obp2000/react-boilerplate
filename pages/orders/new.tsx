import Head from 'next/head'
import { GetServerSideProps } from 'next'
import type { NextPage } from 'next'
import Layout from '../../src/components/layout/layout'
// import {Form} from 'react-final-form'
import { getOptions } from '../../src/components/options/apiSlice'
import { getRunningOperationPromises } from '../../src/services/apiSlice'
import { wrapper } from '../../src/components/Store'
import ObjectForm from '../../src/components/objectForm/ObjectForm'
import { objectFormConfig } from '../../src/components/orders/hooks'
import { getUser } from '../../src/components/users/apiSlice'

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(({ dispatch, getState }) => async (context) => {
    dispatch(getOptions.initiate(objectFormConfig.indexUrl))
    dispatch(getUser.initiate())
    await Promise.all(getRunningOperationPromises())
    return {
      props: {},
    }
  }
  )

const NewObject: NextPage = () => <Layout indexUrl={objectFormConfig.indexUrl}>
  {/* <Head>
        <title>Best&C</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>*/}
  <ObjectForm {...objectFormConfig} />
</Layout>

export default NewObject

