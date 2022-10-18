import parse from 'html-react-parser'
import { FormText } from 'reactstrap'
import type { DropdownListAttrs } from '../../../interfaces/dropdownList'
import type { FieldAttrs } from '../../../interfaces/input'
import type { SelectFieldAttrs } from '../../../interfaces/selectField'
import { useMapFieldProps } from '../options/hooks'

const FormTextList = (
  props: FieldAttrs | SelectFieldAttrs | DropdownListAttrs
) => {
  let { helpText } = useMapFieldProps(props)
  if (!helpText) { return null }
  return <FormText>{parse(helpText)}</FormText>
}

export default FormTextList
