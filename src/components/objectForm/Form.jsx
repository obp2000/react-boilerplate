import { Form } from 'react-final-form'
import { useObjectForm } from './hooks'

const FormComp = (objectFormConfig) => <Form
	{...useObjectForm(objectFormConfig)} />

export default FormComp
