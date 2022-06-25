import {objectToFormData} from 'object-to-formdata'
import {apiSlice} from '../../services/apiSlice'
import {setAll, objectsInitialState} from '../../services/entityAdapter'
import {
    getObjectsQuery,
    getObjectQuery,
    createObjectMutation,
    updateObjectMutation,
    deleteObjectMutation,
} from '../../services/objectQueries'

const url = '/products/'

const type = 'Products'

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query(getObjectsQuery(url, type)),
        getProduct: builder.query(getObjectQuery(url, type)),
        createProduct: builder.mutation(createObjectMutation(url, type)),
        updateProduct: builder.mutation(updateObjectMutation(url, type)),
        deleteProduct: builder.mutation(deleteObjectMutation(url, type)),
    })
})

export const {
    useGetProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = extendedApiSlice

export const {getProducts} = extendedApiSlice.endpoints
