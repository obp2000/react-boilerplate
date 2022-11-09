/* global Promise*/
/* eslint no-undef: "error"*/
import { selectAuth } from '@/auth/selectors'
import { url as indexUrl } from '@/customers/apiSlice'
import { objectsTableConfig } from '@/customers/config'
import Layout from '@/layout/Layout'
import ObjectsTable from '@/objectsTable/ObjectsTable'
import { getOptions } from '@/options/apiSlice'
import { getRunningOperationPromises } from '@/services/apiSlice'
import { wrapper } from '@/services/store'
import { getUser } from '@/users/apiSlice'
import { GetServerSideProps } from 'next'

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

const Home = () => <Layout {...{ indexUrl }}>
  <ObjectsTable {...objectsTableConfig} />
</Layout>

export default Home


// import { GetStaticProps } from 'next'

// export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
//   ({ dispatch }) => async (context) => {
//     // console.log('context...............', context)
//     // console.log('store...............', store)
//     // dispatch(getOptions.initiate(objectsTableConfig.indexUrl))
//     // dispatch(objectsTableConfig.getObjects.initiate({}))
//     // const {isAuthenticated} = selectAuth(store.getState())
//     // console.log('isAuthenticated...............', isAuthenticated)
//     // if (isAuthenticated) {
//     //   dispatch(getUser.initiate())
//     // }
//     // await Promise.all(getRunningOperationPromises())
//     return {
//       props: {},
//     }
//   }
// )
