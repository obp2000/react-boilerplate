import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export const selectAuth = createSelector(
  [({ auth }: RootState) => auth],
  (auth) => auth
)

export const selectAuthModal = createSelector(
  [({ authModal }: RootState) => authModal],
  (authModal) => authModal
)