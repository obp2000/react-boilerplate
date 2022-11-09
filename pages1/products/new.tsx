import { GetServerSideProps } from 'next'
import Layout from '@/layout/Layout'
import Form from '@/objectForm/Form'
import { getOptions } from '@/options/apiSlice'
import { objectFormConfig } from '@/products/config'
import { url as indexUrl } from '@/products/apiSlice'
import { wrapper } from '@/services/store'
import { getUser } from '@/users/apiSlice'
import { getRunningOperationPromises } from '@/services/apiSlice'

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(({ dispatch }) => async () => {
    dispatch(getOptions.initiate(indexUrl))
    dispatch(getUser.initiate())
    await Promise.all(getRunningOperationPromises())
    return {
      props: {},
    }
  })

const NewObject = () => <Layout {...{ indexUrl }}>
  <Form {...{ ...objectFormConfig, indexUrl }} />
</Layout>

export default NewObject
