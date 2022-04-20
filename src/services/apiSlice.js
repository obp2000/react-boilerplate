import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { objectToFormData } from 'object-to-formdata'
import { tokenHeaders } from '../components/redux/auth'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api' }),
    tagTypes: ['Posts'],
    endpoints: builder => ({
        getOptions: builder.query({
            query: ({
                url = '/',
                params
            } = {}) => ({
                url,
                method: 'OPTIONS',
                params
            }),
            transformResponse: ({
                    common_consts,
                    actions
                },
                meta,
                arg) => ({
                common_consts,
                options: actions.POST || actions.PUT
            })
        }),
        getObjects: builder.query({
            query: ({
                url,
                params
            }) => ({
                url,
                params
            }),
            providesTags: ({ results }) =>
                // is result available?
                results ? // successful query
                [
                    ...results.map(({ id }) => ({ type: 'Posts', id })),
                    { type: 'Posts', id: 'LIST' },
                ] : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                [{ type: 'Posts', id: 'LIST' }],
        }),
        createObject: builder.mutation({
            query: ({
                url,
                accessToken,
                to_form_data,
                ...values
            }) => ({
                url,
                method: 'POST',
                body: to_form_data ? objectToFormData(values) : values,
                ...tokenHeaders(accessToken, to_form_data)
            }),
            invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
        }),
        getObject: builder.query({
            query: ({
                url,
                id,
                accessToken
            }) => ({
                url: `${url}${to_object_id(id)}`,
                ...tokenHeaders(accessToken)
            }),
            providesTags: (result, error, { id }) => [{ type: 'Posts', id }],
        }),
        updateObject: builder.mutation({
            query: ({
                url,
                id,
                accessToken,
                to_form_data,
                ...values
            }) => ({
                url: `${url}${id}/`,
                method: 'PUT',
                body: to_form_data ? objectToFormData(values) : values,
                ...tokenHeaders(accessToken, to_form_data)
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Posts', id }],
        }),
        deleteObject: builder.mutation({
            query: ({
                url,
                id,
                accessToken,
            }) => ({
                url: `${url}${to_object_id(id)}`,
                method: 'DELETE',
                ...tokenHeaders(accessToken, to_form_data)
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Posts', id }],
        }),
    })
})

const to_object_id = id => (id == 'new') ? '' : `${id}/`

export const {
    useGetOptionsQuery,
    useGetObjectsQuery,
    useGetObjectQuery,
    useCreateObjectMutation,
    useUpdateObjectMutation,
    useDeleteObjectMutation
} = apiSlice

const emptyData = {}
const emptyCommonConsts = {}

export const useCommonConsts = ({ url, params } = {}) =>
    useGetOptionsQuery({ url, params }, {
        selectFromResult: ({
            data: {
                common_consts
            } = emptyData
        }) => common_consts
    })

export const useOptions = ({ url, params }) =>
    useGetOptionsQuery({ url, params }, {
        selectFromResult: ({
            data: {
                options
            } = emptyData
        }) => options
    })

// export const getObjectsThunk = index_url => createAsyncThunk(
//     'getObjects',
//     async (_, { getState }) => {
//         const { data } = await api.get(
//             index_url, { params: selectLocation(getState()).query }
//         )
//         return data
//     }
// )