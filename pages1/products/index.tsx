import { GetServerSideProps } from 'next'
import { selectAuth } from '@/auth/selectors'
import { objectsTableConfig } from '@/products/config'
import { url as indexUrl } from '@/products/apiSlice'
import Layout from '@/layout/Layout'
import ObjectsTable from '@/objectsTable/ObjectsTable'
import { getOptions } from '@/options/apiSlice'
import { wrapper } from '@/services/store'
import { getUser } from '@/users/apiSlice'
import { getRunningOperationPromises } from '@/services/apiSlice'

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(({ dispatch, getState }) => async ({ query }) => {
    dispatch(getOptions.initiate(indexUrl))
    dispatch(objectsTableConfig.getObjects.initiate(query))
    const { isAuthenticated } = selectAuth(getState())
    if (isAuthenticated) {
      dispatch(getUser.initiate())
    }
    await Promise.all(getRunningOperationPromises())
    return {
      props: {},
    }
  })

const List = () => <Layout {...{ indexUrl }}>
  <ObjectsTable {...objectsTableConfig} />
</Layout>

export default List
