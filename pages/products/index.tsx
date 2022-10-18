import React from 'react'
import { GetServerSideProps } from 'next'
import type { NextPage } from 'next'
import Layout from '../../src/components/layout/Layout'
import { getOptions } from '../../src/components/options/apiSlice'
import { getRunningOperationPromises } from '../../src/services/apiSlice'
import { wrapper } from '../../src/components/store'
import ObjectsTable from '../../src/components/objectsTable/ObjectsTable'
import { objectsTableConfig } from '../../src/components/products/config'
import { getProducts as getObjects } from '../../src/components/products/apiSlice'
import { getUser } from '../../src/components/users/apiSlice'
import { selectAuth } from '../../src/components/auth/selectors'

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(({ dispatch, getState }) => async ({ query }) => {
    dispatch(getOptions.initiate(objectsTableConfig.indexUrl))
    dispatch(getObjects.initiate(query))
    const { isAuthenticated } = selectAuth(getState())
    if (isAuthenticated) {
      dispatch(getUser.initiate())
    }
    await Promise.all(getRunningOperationPromises())
    return {
      props: {},
    }
  })

const List: NextPage = () => <Layout indexUrl={objectsTableConfig.indexUrl}>
  <ObjectsTable {...objectsTableConfig} />
</Layout>

export default List
