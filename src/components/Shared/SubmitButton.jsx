import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import { selectSaveText } from '../redux/CommonConsts'

const calculatedFields = [
    'density_for_count',
    'meters_in_roll',
    'prices',
    'need_gift',
    'post_cost_with_packet',
    'post_discount',
    'total_postals',
    'total_sum',
    'total_text',
    'total_weight']

const isCalculatedFields = fields =>
    Object.keys(fields).every(field => calculatedFields.includes(field))

const SubmitButton = ({
        submitting,
        pristine,
        hasSubmitErrors,
        hasValidationErrors,
        dirtySinceLastSubmit,
        dirtyFields,
        text,
        className
    }) => {
    const save = useSelector(selectSaveText)
    return <Button
        type="submit"
        color="primary"
        outline
        size="sm"
        className={className}
        disabled={submitting ||
                  pristine ||
                  isCalculatedFields(dirtyFields) ||
                  hasValidationErrors ||
                  (hasSubmitErrors && !dirtySinceLastSubmit)}>
        {text || save}
    </Button>
}

SubmitButton.propTypes = {
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    hasSubmitErrors: PropTypes.bool,
    hasValidationErrors: PropTypes.bool,
    dirtySinceLastSubmit: PropTypes.bool,
    save: PropTypes.string,
    text: PropTypes.string
}

export default SubmitButton