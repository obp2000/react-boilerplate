export const selectPathname = ({
    router: {
        location: {
            pathname
        }
    }
}) => pathname

export const selectPage = ({
    router: {
        location: {
            query: {
                page = 1
            }
        }
    }
}) => page

export const selectTerm = ({
    router: {
        location: {
            query: {
                term
            }
        }
    }
}) => term
