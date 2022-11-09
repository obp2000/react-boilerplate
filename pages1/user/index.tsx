import { GetServerSideProps } from 'next'
import { selectAuth } from '@/auth/selectors'
import Layout from '@/layout/Layout'
import { getOptions } from '@/options/apiSlice'
import { wrapper } from '@/services/store'
import { getUser } from '@/users/apiSlice'
import { url as indexUrl } from '@/users/apiSlice'
import User from '@/users/User'
import { getRunningOperationPromises } from '@/services/apiSlice'

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

const Home = () => <Layout {...{ indexUrl }}>
  <User />
</Layout>

export default Home
