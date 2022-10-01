import { objectToFormData } from 'object-to-formdata'
import { apiSlice } from '../../services/apiSlice'
import { indexUrl as url } from './hooks'
import {
  setAll,
  objectsInitialState,
} from '../../services/entityAdapter'
import {
  Product as GetObject,
  ProductFormValues as ObjectFormValues,
  RawObjectsWithTotals,
  ObjectsWithTotals,
} from '../../../interfaces'

type GetObjectsArg = {
  params?: Object
}

type GetObjectArg = {
  id?: number
}

type DeleteObjectArg = {
  id: number
}

const type = 'Products'

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ObjectsWithTotals, GetObjectsArg>({
      query: (params) => ({ url, params }),
      transformResponse: ({
        results,
        ...rest
      }: RawObjectsWithTotals) => ({
        ...setAll(objectsInitialState, results),
        ...rest
      }),
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
          [
            ...result.ids.map((id) => ({ type, id } as const)),
            { type, id: 'LIST' },
          ]
          : [{ type, id: 'LIST' }],
    }),
    createProduct: builder.mutation<GetObject, ObjectFormValues>({
      query: ({
        id,
        product_type,
        get_product_type_display,
        get_threads_display,
        get_contents_display,
        created_at,
        updated_at,
        consts,
        density_for_count,
        meters_in_roll,
        prices,
        ...values
      }) => {
        if (product_type) {
          values.product_type_id = product_type
        }
        return {
          url,
          method: 'POST',
          body: objectToFormData(values),
        }
      },
      invalidatesTags: [{ type, id: 'LIST' }],
    }),
    getProduct: builder.query<GetObject, GetObjectArg>({
      query: ({ id }) => ({ url: `${url}${id}/` }),
      // providesTags: (_, __, { id }) => [{ type, id }],
    }),
    updateProduct: builder.mutation<GetObject, ObjectFormValues>({
      query: ({
        id,
        product_type,
        get_product_type_display,
        get_threads_display,
        get_contents_display,
        created_at,
        updated_at,
        consts,
        density_for_count,
        meters_in_roll,
        prices,
        ...values
      }) => {
        if (product_type) {
          values.product_type_id = product_type
        }
        return {
          url: `${url}${id}/`,
          method: 'PUT',
          body: objectToFormData(values),
        }
      },
      onQueryStarted({
        image,
        ...patch
      },
        { dispatch, queryFulfilled }) {
        // const endpointName = `get${type.slice(0, -1)}` as QueryKeys
        console.log({ patch })
        patch.updated_at = new Date().toISOString()
        const { undo } = dispatch(
          extendedApiSlice.util.updateQueryData(
            'getProduct',
            { id: patch.id },
            ({ image, ...draft }) => Object.assign(draft, patch)
          )
        )
        queryFulfilled.catch(undo)
      },
      invalidatesTags: (_result, _error, { id }) => [{ type, id }],
    }),
    deleteProduct: builder.mutation<void, DeleteObjectArg>({
      query: ({ id }) => ({
        url: `${url}${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type, id }],
    }),
  }),
})

export const {
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = extendedApiSlice

export const { getProducts, getProduct } = extendedApiSlice.endpoints


// import {objectToFormData} from 'object-to-formdata'
// import {apiSlice} from '../../services/apiSlice'
// import {setAll, objectsInitialState} from '../../services/entityAdapter'
// import {
//   getObjectsQuery,
//   getObjectQuery,
//   createObjectMutation,
//   updateObjectMutation,
//   deleteObjectMutation,
// } from '../../services/objectQueries'

// const url = '/products/'

// const type = 'Products'

// export const extendedApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getProducts: builder.query(getObjectsQuery(url, type)),
//     getProduct: builder.query(getObjectQuery(url, type)),
//     createProduct: builder.mutation(createObjectMutation(url, type)),
//     updateProduct: builder.mutation(updateObjectMutation(url, type)),
//     deleteProduct: builder.mutation(deleteObjectMutation(url, type)),
//   }),
// })