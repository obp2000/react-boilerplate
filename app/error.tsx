'use client'

import { useEffect } from 'react'
// import { toastError } from '@/notifications/toast'

export default function Error({
  error,
  reset,
}: {
  error: Error,
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
    // toastError(error.message)
  }, [error])

  return (
    <div>
      <p>{error.message}</p>
      {/*<button onClick={() => reset()}>Reset error boundary</button>*/}
    </div>
  )
}
