import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import {
  indexUrl,
  objectFormConfig
} from '../../src/components/customers/config'
import Layout from '../../src/components/layout/Layout'
import Form from '../../src/components/objectForm/Form'
import { useTestObjectId } from '../../src/components/objectForm/hooks'
import { getOptions } from '../../src/components/options/apiSlice'
import { wrapper } from '../../src/components/store'
import { getUser } from '../../src/components/users/apiSlice'
import { getRunningOperationPromises } from '../../src/services/apiSlice'

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



// import { GetStaticPaths, GetStaticProps } from 'next'
// import { createSelector } from '@reduxjs/toolkit'
// import type { EntityId, Dictionary, } from '@reduxjs/toolkit'
// import {
//   getCustomers as getObjects,
// } from '../../src/components/customers/apiSlice'
// import { makeStore } from '../../src/components/store'
// import { getSelectors } from '../../src/services/entityAdapter'
// import type { AppDispatch } from '../../src/components/store'

// export const getStaticPaths: GetStaticPaths = async () => {
//   const { dispatch, getState } = makeStore()
//   await dispatch(getObjects.initiate({}))
//   const selectObjectsResult = getObjects.select({})
//   const selectObjectsData =
//     createSelector([selectObjectsResult], ({ data }) => data)
//   const { selectAll } = getSelectors(selectObjectsData)
//   const allObjects = selectAll(getState())
//   const paths = allObjects.map(({ id }) => ({
//     params: {
//       id: id.toString()
//     }
//   }))
//   // console.log('paths....................... ', paths)
//   return { paths, fallback: true, }
// }

// export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
//   ({ dispatch }) => async ({ params }) => {
//     // console.log('context...............', context)
//     const id = params?.id
//     if (useTestObjectId(id)) {
//       const { isError } = await dispatch(getObject.initiate({ id: Number(id) }))
//       if (isError) { return { notFound: true } }
//     } else {
//       return { notFound: true }
//     }
//     dispatch(getOptions.initiate(objectFormConfig.indexUrl))
//     // dispatch(getUser.initiate())
//     await Promise.all(getRunningOperationPromises())
//     return { props: {} }
//   }
// )
