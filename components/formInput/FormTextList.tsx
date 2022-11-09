import parse from 'html-react-parser'
import { FC } from 'react'
import type { FieldRenderProps } from 'react-final-form'
import { FormText } from 'reactstrap'
import type { DropdownListAttrs } from '@/interfaces/dropdownList'
import type { SelectFieldAttrs } from '@/interfaces/selectField'
import { useMapFieldProps } from '@/options/hooks'

const FormTextList: FC<FieldRenderProps<any> | SelectFieldAttrs |
  DropdownListAttrs> = (props) => {
    let { helpText } = useMapFieldProps(props)
    if (!helpText) { return null }
    return <FormText>{parse(helpText)}</FormText>
  }

export default FormTextList
