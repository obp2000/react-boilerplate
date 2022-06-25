import {
    setAll,
    objectsInitialState,
} from './entityAdapter'

export const getObjectsQuery = (url, type) => ({
    query: (params) => ({url, params}),
    transformResponse: ({
        totalCount,
        totalPages,
        results
    }) => ({
        totalCount,
        totalPages,
        ...setAll(objectsInitialState, results)
    }),
    providesTags: ({ids}, error, arg) =>
    	[...ids.map((id) => ({type, id})), {type, id: 'LIST'}],
})

export const getObjectQuery = (url, type) => ({
    query: ({id}) => ({url: `${url}${id}/`}),
    providesTags: (result, error, {id}) => [{type, id}],
})

export const createObjectMutation = (url, type) => ({
    query: ({toFormData, ...values}) => ({
        url,
        method: 'POST',
        body: toFormData ? objectToFormData(values) : values,
    }),
    invalidatesTags: [{type, id: 'LIST'}],
})

export const updateObjectMutation = (url, type) => ({
    query: ({id, toFormData, ...values}) => ({
        url: `${url}${id}/`,
        method: 'PUT',
        body: toFormData ? objectToFormData(values) : values,
    }),
    invalidatesTags: (result, error, arg) => [{type, id: 'LIST'}],
})

export const deleteObjectMutation = (url, type) => ({
    query: ({id, tableArgs}) => ({
        url: `${url}${id}`,
        method: 'DELETE',
    }),
    invalidatesTags: (result, error, {id}) => [{type, id}, {type, id: 'LIST'}],
})
