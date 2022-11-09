import { GetServerSideProps } from 'next'
import Layout from '@/layout/Layout'
import Form from '@/objectForm/Form'
import { useTestObjectId } from '@/objectForm/hooks'
import { getOptions } from '@/options/apiSlice'
import { objectFormConfig } from '@/orders/config'
import { url as indexUrl } from '@/orders/apiSlice'
import { wrapper } from '@/services/store'
import { getUser } from '@/users/apiSlice'
import { getRunningOperationPromises } from '@/services/apiSlice'

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

const EditObject = () => <Layout {...{ indexUrl }}>
  <Form {...{ ...objectFormConfig, indexUrl }} />
</Layout>

export default EditObject
