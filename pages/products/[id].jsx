import Head from 'next/head'
import Layout from '../../components/layout'
import {getOptions} from '../../src/components/options/apiSlice'
import {getRunningOperationPromises} from '../../src/services/apiSlice'
import {wrapper} from '../../src/components/Store'
import ObjectForm from '../../src/components/objectForm/ObjectForm'
import {
  useProductForm as useObjectForm,
  indexUrl,
} from '../../src/components/products/hooks'
import {getProduct as getObject} from '../../src/components/products/apiSlice'
import {getUser} from '../../src/components/users/apiSlice'
import {useTestObjectId} from '../../src/components/objectForm/hooks'

export const getServerSideProps = wrapper.getServerSideProps(
    ({dispatch, getState}) => async ({params}) => {
      const id = params?.id
      if (useTestObjectId(id)) {
        const result = dispatch(getObject.initiate({id}))
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
