import type { DropdownListAttrs } from '@/interfaces/dropdownList'
import type { SelectFieldAttrs } from '@/interfaces/selectField'
import { useMapFieldProps } from '@/options/hooks'
import parse from 'html-react-parser'
import type { FieldRenderProps } from 'react-final-form'
import { FormText } from 'reactstrap'

export default function FormTextList(props: FieldRenderProps<any> |
  SelectFieldAttrs | DropdownListAttrs) {
  let { helpText } = useMapFieldProps(props)
  if (!helpText) { return null }
  return <FormText>{parse(helpText)}</FormText>
}
