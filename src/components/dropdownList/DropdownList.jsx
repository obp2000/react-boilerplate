import PropTypes from 'prop-types'
import React from 'react'
import DropdownList from 'react-widgets/DropdownList'
import FormTextList from '../Shared/FormTextList'
import {useFormText} from '../Shared/FieldProps'
import {useDropdownList} from './hooks'

const DropdownListComp = (props) => {
  return <>
    <DropdownList filter='contains' {...useDropdownList(props)} />
    <FormTextList formText={useFormText(props)} />
  </>
}

DropdownListComp.propTypes = {
  props: PropTypes.string,
}

export default DropdownListComp
