'use client'

import { useEffect } from 'react'

export default function ErrorComp({
  error,
  reset,
}: {
  error: Error,
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
    // toastError(error.message)
  }, [error])
  return (
    <div>
      <h3>{error.name}</h3>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Reset</button>
    </div>
  )
}
