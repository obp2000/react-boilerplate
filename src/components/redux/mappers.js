const mapCollectionState = (collection_name, {
    [collection_name]: {
        results,
        totalCount,
        totalPages,
        isFetching,
        search_results
    },
    auth: {
        accessToken
    },
    router: {
        location: {
            query: {
                term = ''
            },
            search
        }
    }
}) => ({
    results,
    totalCount,
    totalPages,
    isFetching,
    accessToken,
    term,
    search,
    search_results
})

const mapCollectionOwnProps = ({
    match: {
        params: {
            page = 1
        }
    } = { params: {} }
}) => ({ page: parseInt(page) })

export const mapCollectionStateToProps = (collection_name) =>
    (state, ownProps) => ({
        ...mapCollectionState(collection_name, state),
        ...mapCollectionOwnProps(ownProps)
    })

const mapObjectOwnProps = ({
    match: {
        params: {
            id
        }
    }
}) => ({ id })

const mapObjectState = (collection_name, state) => {
    const {
        [collection_name]: {
            object: initialValues,
            isFetching
        },
        auth: {
            accessToken
        }
    } = state
    const { created_at } = initialValues || {}
    return {
        initialValues,
        isFetching,
        accessToken,
        created_at
        // ...selector(state)
    }
}

export const mapObjectStateToProps = (collection_name, object_name) =>
    (state, ownProps) => ({
        ...mapObjectOwnProps(ownProps),
        ...mapObjectState(collection_name, state),
    })

export const mapRowStateToProps = ({
    auth: {
        accessToken
    }
}) => ({ accessToken })

export const mapDeliveryTypesStateToProps = () => ({
    orders: {
        object: {
            delivery_types = []
        }
    }
}) => ({
    delivery_types
})