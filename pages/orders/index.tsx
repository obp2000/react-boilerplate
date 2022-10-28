import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { selectAuth } from '../../components/auth/selectors'
import Layout from '../../components/layout/Layout'
import ObjectsTable from '../../components/objectsTable/ObjectsTable'
import { getOptions } from '../../components/options/apiSlice'
import { objectsTableConfig } from '../../components/orders/config'
import { url as indexUrl } from '../../components/orders/apiSlice'
import { wrapper } from '../../services/store'
import { getUser } from '../../components/users/apiSlice'
import { getRunningOperationPromises } from '../../services/apiSlice'

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

const List: NextPage = () => <Layout {...{ indexUrl }}>
  <ObjectsTable {...objectsTableConfig} />
</Layout>

export default List
