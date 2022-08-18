import {createSelector} from '@reduxjs/toolkit'

export const selectAuth = createSelector(
    [({auth}) => auth],
    (auth) => auth
)

export const selectAuthModal = createSelector(
    [({authModal}) => authModal],
    (authModal) => authModal
)
