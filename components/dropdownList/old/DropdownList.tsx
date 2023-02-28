'use client'

import type { DropdownFieldRenderProps } from '@/interfaces/dropdownList'
import dynamic from 'next/dynamic'
import { ComponentType, useEffect, useState } from 'react'
import { useFieldProps } from './hooks'
import DropdownListPlaceholder from './placeholders/DropdownList'
// import DropdownList from '@/app/client/DropdownList'

const DynamicDropdownList: ComponentType = dynamic(
  () => import('@/app/client/DropdownList'),
  {
    loading: () => <DropdownListPlaceholder />,
    // ssr: false,
  })

export default function DropdownListComp(props: DropdownFieldRenderProps) {
  const dropdownProps = useFieldProps(props)
  const [showDropdown, setShowDropdown] = useState(false)
  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowDropdown(true)
  }, [])
  return showDropdown
    ? <DynamicDropdownList {...dropdownProps} />
    : <DropdownListPlaceholder />
  // return <DropdownList {...dropdownProps} />
}
