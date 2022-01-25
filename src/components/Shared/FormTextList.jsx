import PropTypes from 'prop-types'
import React from 'react'
import { FormText } from 'reactstrap'

const FormTextRow = ({ form_text_row }) => <li>{form_text_row}</li>

const FormTextList = ({ form_text }) =>
    <FormText>
        <ul>
            {form_text.map((form_text_row, index) =>
                <FormTextRow key={index} form_text_row={form_text_row}/>)
            }
        </ul>
    </FormText>

FormTextList.propTypes = {
    form_text: PropTypes.array,
}

export default FormTextList