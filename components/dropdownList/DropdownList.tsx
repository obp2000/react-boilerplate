'use client'

import 'react-widgets/scss/styles.scss'

// import { useTranslation } from '@/app/i18n/client'
// import DropdownList from '@/client/DropdownList'
// import { Localization } from 'react-widgets'
import { useFieldProps } from './hooks'
import { useEffect, useState } from 'react'
import DropdownListPlaceholder from './placeholders/DropdownList'
import dynamic from 'next/dynamic'
import { FieldRenderProps } from 'react-final-form'
import { DropdownProps } from 'react-widgets/cjs/DropdownList'

const DynamicDropdownList = dynamic(() => import('@/client/DropdownList'), {
  loading: () => <DropdownListPlaceholder />,
  // ssr: false,
})

export default function DropdownListComp({
  notFound,
  ...props
}: FieldRenderProps<any> & DropdownProps<any>) {
  // const { t } = useTranslation(props.lng)
  // const notFound = t('not_found')
  const dropdownProps = useFieldProps(props)
  const [showDropdown, setShowDropdown] = useState(false)
  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowDropdown(true)
  }, [])
  if (!showDropdown) {
    // You can show some kind of placeholder UI here
    return <DropdownListPlaceholder />
  }
  return <DynamicDropdownList {...dropdownProps} />
}
