import Head from 'next/head'
// import {Form} from 'react-final-form'
import Layout from '../../components/layout'
import {getOptions} from '../../src/components/options/apiSlice'
import {getRunningOperationPromises} from '../../src/services/apiSlice'
import {wrapper} from '../../src/components/Store'
import ObjectForm from '../../src/components/objectForm/ObjectForm'
import {
  useOrderForm as useObjectForm,
  indexUrl,
} from '../../src/components/orders/hooks'
import {getUser} from '../../src/components/users/apiSlice'

export const getServerSideProps = wrapper.getServerSideProps(
    ({dispatch, getState}) => async (context) => {
      dispatch(getOptions.initiate(indexUrl))
      dispatch(getUser.initiate())
      await Promise.all(getRunningOperationPromises())
      return {
        props: {},
      }
    }
)

export default function NewObject() {
  return (
    <Layout indexUrl={indexUrl} >
      {/*      <Head>
          <title>Best&C</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>*/}
      <ObjectForm {...useObjectForm()} />
    </Layout>
  )
}
