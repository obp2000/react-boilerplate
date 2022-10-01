import React from 'react'
import DropdownList from 'react-widgets/DropdownList'
import FormTextList from '../Shared/FormTextList'
import { useDropdownList } from './hooks'
import type { DropdownListAttrs } from '../../../interfaces'

const DropdownListComp = (props: DropdownListAttrs) => {
  const { helpText, ...dropdownListProps } = useDropdownList(props)
  return <>
    <DropdownList filter='contains' {...dropdownListProps} />
    <FormTextList formText={helpText} />
  </>
}

export default DropdownListComp
