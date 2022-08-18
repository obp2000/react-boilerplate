import Head from 'next/head'
import Layout from '../../components/layout'
import {getOptions} from '../../src/components/options/apiSlice'
import {getRunningOperationPromises} from '../../src/services/apiSlice'
import {wrapper} from '../../src/components/Store'
import ObjectForm from '../../src/components/objectForm/ObjectForm'
import {
  useCustomerForm as useObjectForm,
  indexUrl,
} from '../../src/components/customers/hooks'
import {getCustomer as getObject} from '../../src/components/customers/apiSlice'
import {getUser} from '../../src/components/users/apiSlice'
import {useTestObjectId} from '../../src/components/objectForm/hooks'

export const getServerSideProps = wrapper.getServerSideProps(
    ({dispatch, getState}) => async ({params}) => {
      // console.log('context...............', context)
      const id = params?.id
      if (useTestObjectId(id)) {
        dispatch(getObject.initiate({id}))
      } else {
        return {notFound: true}
      }
      dispatch(getOptions.initiate(indexUrl))
      dispatch(getUser.initiate())
      await Promise.all(getRunningOperationPromises())
      return {
        props: {},
      }
    }
)

export default function EditObject() {
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
