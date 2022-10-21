import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { selectAuth } from '../../src/components/auth/selectors'
import {
    indexUrl,
    objectsTableConfig
} from '../../src/components/customers/config'
import Layout from '../../src/components/layout/Layout'
import ObjectsTable from '../../src/components/objectsTable/ObjectsTable'
import { getOptions } from '../../src/components/options/apiSlice'
import { wrapper } from '../../src/components/store'
import { getUser } from '../../src/components/users/apiSlice'
import { getRunningOperationPromises } from '../../src/services/apiSlice'

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
