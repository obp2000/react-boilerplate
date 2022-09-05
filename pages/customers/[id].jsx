import Head from 'next/head'
import { getOptions } from '../../src/components/options/apiSlice'
import { getRunningOperationPromises } from '../../src/services/apiSlice'
import { wrapper } from '../../src/components/Store'
import ObjectForm from '../../src/components/objectForm/ObjectForm'
import {objectFormConfig} from '../../src/components/customers/hooks'
import {
  getCustomers as getObjects,
  getCustomer as getObject
} from '../../src/components/customers/apiSlice'
import { getUser } from '../../src/components/users/apiSlice'
import {
  useObjectForm,
  useTestObjectId
} from '../../src/components/objectForm/hooks'
import { makeStore } from '../../src/components/Store'

export async function getStaticPaths() {
  const {dispatch} = makeStore()
  const {data} = await dispatch(getObjects.initiate({}))
  const paths = data?.ids.map((id) => ({
    params: {
      id: id.toString()
    }
  }))
  // console.log('paths....................... ', paths)
  return {paths, fallback: true,}
}

export const getStaticProps = wrapper.getStaticProps(
  ({dispatch, getState}) => async (context) => {
    // console.log('context...............', context)
    const id = context?.params?.id
    if (useTestObjectId(id)) {
      const {isError} = await dispatch(getObject.initiate({id}))
      if (isError) {return {notFound: true}}
    } else {
      return {notFound: true}
    }
    // dispatch(getOptions.initiate('/customers/'))
    // dispatch(getUser.initiate())
    await Promise.all(getRunningOperationPromises())
    return {props: {}}
  }
)

export default function EditObject() {
  return (
    <Layout indexUrl={objectFormConfig.indexUrl}>
      {/* <Head>
            <title>Best&C</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>*/}
      <ObjectForm {...useObjectForm(objectFormConfig)} />
    </Layout>
  )
}