import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import Layout from '../../components/layout/Layout'
import Form from '../../components/objectForm/Form'
import { getOptions } from '../../components/options/apiSlice'
import { objectFormConfig } from '../../components/orders/config'
import { url as indexUrl } from '../../components/orders/apiSlice'
import { wrapper } from '../../services/store'
import { getUser } from '../../components/users/apiSlice'
import { getRunningOperationPromises } from '../../services/apiSlice'

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(({ dispatch }) => async () => {
    dispatch(getOptions.initiate(indexUrl))
    dispatch(getUser.initiate())
    await Promise.all(getRunningOperationPromises())
    return {
      props: {},
    }
  })

const NewObject: NextPage = () => <Layout {...{ indexUrl }}>
  <Form {...{ ...objectFormConfig, indexUrl }} />
</Layout>

export default NewObject

