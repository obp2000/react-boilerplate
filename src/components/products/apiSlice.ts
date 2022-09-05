import {objectToFormData} from 'object-to-formdata'
import {apiSlice} from '../../services/apiSlice'
import {
  setAll,
  objectsInitialState,
  ObjectsWithTotals,
  RawObjectsWithTotals
} from '../../services/entityAdapter'
import {
  Product as GetObject,
  ProductFormValues as ObjectFormValues
} from '../../../interfaces'

type GetObjectsArg = {
  params?: Object
}

type GetObjectArg = {
  id?: number
}

type MutateObjectArg = ObjectFormValues & {
  toFormData?: boolean
}

type DeleteObjectArg = {
  id: number
}

const url = '/products/'

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
        result
          ? [...result.ids.map((id) => ({ type, id })), { type, id: 'LIST' },]
          : [{ type, id: 'LIST' }],
    }),
    getProduct: builder.query<GetObject, GetObjectArg>({
      query: ({ id }) => ({ url: `${url}${id}/` }),
      providesTags: (_, __, { id }) => [{ type, id }],
    }),
    createProduct: builder.mutation<GetObject, MutateObjectArg>({
      query: ({toFormData, ...values}) => ({
        url,
        method: 'POST',
        body: toFormData ? objectToFormData(values) : values,
      }),
      invalidatesTags: [{type, id: 'LIST'}],
    }),
    updateProduct: builder.mutation<GetObject, MutateObjectArg>({
      query: ({id, toFormData, ...values}) => ({
        url: `${url}${id}/`,
        method: 'PUT',
        body: toFormData ? objectToFormData(values) : values,
      }),
      onQueryStarted({id, toFormData, ...values},
        {dispatch, queryFulfilled}) {
        // const endpointName = `get${type.slice(0, -1)}` as QueryKeys
        const {undo} = dispatch(
          extendedApiSlice.util.updateQueryData(
            'getProduct',
            {id},
            (draftObject) => ({...draftObject, ...values})
          )
        )
        queryFulfilled.catch(undo)
      },
      invalidatesTags: (_, __) => [{type, id: 'LIST'}],
    }),
    deleteProduct: builder.mutation<void, DeleteObjectArg>({
      query: ({id}) => ({
        url: `${url}${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, {id}) => [{type, id}, {type, id: 'LIST'}],
    }),
  }),
})

export const {
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = extendedApiSlice

export const {getProducts, getProduct} = extendedApiSlice.endpoints


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