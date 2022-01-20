const mapCollectionState = (collection_name, {
    [collection_name]: {
        results,
        totalCount,
        totalPages,
        isFetching,
        search_results,
        errors
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
    search_results,
    errors
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

const mapObjectState = (collection_name, {
    [collection_name]: {
        object: initialValues,
        isFetching,
        errors
    },
    auth: {
        accessToken
    }
}) => ({
    initialValues,
    isFetching,
    accessToken,
    errors
})

export const mapObjectStateToProps = (collection_name, object_name) =>
    (state, ownProps) => ({
        ...mapObjectOwnProps(ownProps),
        ...mapObjectState(collection_name, state),
    })
