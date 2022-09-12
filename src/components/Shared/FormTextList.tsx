import { FormText } from 'reactstrap'
import parse from 'html-react-parser'

type Props = {
  formText?: string
}

const FormTextList = ({ formText }: Props) => {
  if (!formText) { return null }
  return <FormText>{parse(formText)}</FormText>
}

export default FormTextList
