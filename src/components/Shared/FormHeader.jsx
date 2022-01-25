import PropTypes from 'prop-types'
import React from 'react'
import { CardHeader, CardTitle } from 'reactstrap'
import SubmitButton from '../Shared/SubmitButton'
import BackButton from '../Shared/Containers/BackButton'

const FormHeader = ({
        title,
        submitting,
        invalid,
        pristine
    }) =>
    <CardHeader>
        <CardTitle tag="h4">
            <BackButton />
            &nbsp;
            {title}
            &nbsp;
            <SubmitButton submitDisabled={submitting || invalid || pristine}/>
        </CardTitle>
    </CardHeader>

export default FormHeader

FormHeader.propTypes = {
    title: PropTypes.string,
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool
}