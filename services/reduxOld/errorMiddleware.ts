import type { Middleware } from '@reduxjs/toolkit'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import { toastError } from '@/notifications/toast'

export const rtkQueryErrorLogger: Middleware = (_) =>
  (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood,
    // so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.warn('We got a rejected action!')
      console.log('action', action)
      if (!['login', 'register'].includes(action.meta.arg.endpointName)) {
        const message = action.payload.data?.detail ||
          `Async error! ${action.error.message}`
        toastError(message)
      }
    }

    return next(action)
  }
