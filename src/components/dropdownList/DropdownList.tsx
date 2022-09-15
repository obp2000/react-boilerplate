import React from 'react'
import DropdownList from 'react-widgets/DropdownList'
import FormTextList from '../Shared/FormTextList'
import { useDropdownList } from './hooks'
import type { DropdownListAttrs } from './hooks'

const DropdownListComp = (props: DropdownListAttrs) => {
  const { helpText, ...DropdownListProps } = useDropdownList(props)
  return <>
    <DropdownList filter='contains' {...DropdownListProps} />
    <FormTextList formText={helpText} />
  </>
}

export default DropdownListComp
