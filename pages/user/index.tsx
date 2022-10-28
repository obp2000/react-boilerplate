import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { selectAuth } from '../../components/auth/selectors'
import Layout from '../../components/layout/Layout'
import { getOptions } from '../../components/options/apiSlice'
import { wrapper } from '../../services/store'
import { getUser } from '../../components/users/apiSlice'
import { url as indexUrl } from '../../components/users/apiSlice'
import User from '../../components/users/User'
import { getRunningOperationPromises } from '../../services/apiSlice'

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(({ dispatch, getState }) => async () => {
    const { isAuthenticated } = selectAuth(getState())
    if (isAuthenticated) {
      dispatch(getOptions.initiate(indexUrl))
      dispatch(getUser.initiate())
    } else {
      return { notFound: true }
    }
    await Promise.all(getRunningOperationPromises())
    return {
      props: {},
    }
  })

const Home: NextPage = () => <Layout {...{ indexUrl }}>
  <User />
</Layout>

export default Home
