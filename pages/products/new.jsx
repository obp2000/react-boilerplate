import Head from 'next/head'
import {getOptions} from '../../src/components/options/apiSlice'
import {getRunningOperationPromises} from '../../src/services/apiSlice'
import {wrapper} from '../../src/components/Store'
import ObjectForm from '../../src/components/objectForm/ObjectForm'
import {objectFormConfig} from '../../src/components/products/hooks'
import {getUser} from '../../src/components/users/apiSlice'
import {useObjectForm} from '../../src/components/objectForm/hooks'

export const getServerSideProps = wrapper.getServerSideProps(
    ({dispatch, getState}) => async (context) => {
      dispatch(getOptions.initiate(objectFormConfig.indexUrl))
      dispatch(getUser.initiate())
      await Promise.all(getRunningOperationPromises())
      return {
        props: {},
      }
    }
)

export default function NewObject() {
  return (
    <>
      {/* <Head>
            <title>Best&C</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>*/}
      <ObjectForm {...useObjectForm(objectFormConfig)} />
    </>
  )
}
