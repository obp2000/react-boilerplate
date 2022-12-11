'use client'

import 'react-widgets/scss/styles.scss'

import DropdownList from 'react-widgets/DropdownList'
import React from 'react'
// const DropdownList = React.lazy(() => import('react-widgets/DropdownList'))
import type { DropdownListAttrs } from '@/interfaces/dropdownList'
import FormTextList from '@/formInput/FormTextList'
import { useFieldProps } from './hooks'

export default function DropdownListComp(props: DropdownListAttrs) {
  return <>
    <DropdownList {...useFieldProps(props)} />
    <FormTextList {...props} />
  </>
}
