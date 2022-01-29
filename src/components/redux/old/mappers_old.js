const mapCollectionState = (collection_name, {
    router: {
        location: {
            query: {
                term = ''
            },
        }
    }
}) => ({
    term
})

// const mapCollectionOwnProps = ({
//     match: {
//         params: {
//             page = 1
//         }
//     } = { params: {} }
// }) => ({ page: parseInt(page) })

export const mapCollectionStateToProps = (collection_name) =>
    state => mapCollectionState(collection_name, state)


// const mapObjectOwnProps = ({
//     match: {
//         params: {
//             id
//         }
//     }
// }) => ({ id })

const mapObjectState = (collection_name, {
    auth: {
        accessToken
    }
}) => ({
    accessToken,
})

export const mapObjectStateToProps = (collection_name, object_name) =>
    state => mapObjectState(collection_name, state)
