import Head from 'next/head'
import {getOptions} from '../../src/components/options/apiSlice'
import {getRunningOperationPromises} from '../../src/services/apiSlice'
import {wrapper} from '../../src/components/Store'
import ObjectForm from '../../src/components/objectForm/ObjectForm'
import {objectFormConfig} from '../../src/components/orders/hooks'
import {getOrder as getObject} from '../../src/components/orders/apiSlice'
import {getUser} from '../../src/components/users/apiSlice'
import {useObjectForm, useTestObjectId} from '../../src/components/objectForm/hooks'

export const getServerSideProps = wrapper.getServerSideProps(
    ({dispatch, getState}) => async ({params}) => {
      const id = params?.id
      if (useTestObjectId(id)) {
        const result = dispatch(getObject.initiate({id}))
      // console.log('result.................', result)
      } else {
        return {notFound: true}
      }
      dispatch(getOptions.initiate(objectFormConfig.indexUrl))
      dispatch(getUser.initiate())
      await Promise.all(getRunningOperationPromises())
      return {
        props: {},
      }
    }
)

export default function EditObject() {
  return (
    <>
      {/*      <Head>
          <title>Best&C</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>*/}
      <ObjectForm {...useObjectForm(objectFormConfig)} />
    </>
  )
}
