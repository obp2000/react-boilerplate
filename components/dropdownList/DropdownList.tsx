import { FC } from 'react'
import DropdownList from 'react-widgets/DropdownList'
import type { DropdownListAttrs } from '../../interfaces/dropdownList'
import FormTextList from '../formInput/FormTextList'
import { useFieldProps } from './hooks'

const DropdownListComp: FC<DropdownListAttrs> = (props) => <>
  <DropdownList {...useFieldProps(props)} />
  <FormTextList {...props} />
</>

export default DropdownListComp
