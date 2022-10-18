import DropdownList from 'react-widgets/DropdownList'
import type { DropdownListAttrs } from '../../../interfaces/dropdownList'
import FormTextList from '../formInput/FormTextList'
import { useFieldProps } from './hooks'

const DropdownListComp = (props: DropdownListAttrs) => <>
  <DropdownList {...useFieldProps(props)} />
  <FormTextList {...props} />
</>

export default DropdownListComp
