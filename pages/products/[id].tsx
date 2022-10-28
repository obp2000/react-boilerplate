import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import Layout from '../../components/layout/Layout'
import Form from '../../components/objectForm/Form'
import { useTestObjectId } from '../../components/objectForm/hooks'
import { getOptions } from '../../components/options/apiSlice'
import { objectFormConfig } from '../../components/products/config'
import { url as indexUrl } from '../../components/products/apiSlice'
import { wrapper } from '../../services/store'
import { getUser } from '../../components/users/apiSlice'
import { getRunningOperationPromises } from '../../services/apiSlice'

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(({ dispatch }) => async ({ params }) => {
    const id = params?.id
    if (useTestObjectId(id)) {
      dispatch(objectFormConfig.getObject.initiate({ id: Number(id) }))
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
