import React, { useState, useEffect, type ReactNode } from 'react'

export default function ClientOnly({
  children,
  fallback,
}: {
  children: ReactNode
  fallback: () => JSX.Element
}) {
  const [hasMounted, setHasMounted] = useState(false)
  const FallbackComp = fallback
  useEffect(() => {
      setHasMounted(true)
  }, [])
  if (!hasMounted) {
    return <FallbackComp />
  }
  return <>
      {children}
    </>
}
