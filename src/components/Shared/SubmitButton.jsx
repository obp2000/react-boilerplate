import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'reactstrap'
// import { selectCommonConsts } from '../redux/CommonConsts'

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

const isCalculatedFields = (fields) =>
  Object.keys(fields).every((field) => calculatedFields.includes(field))

const SubmitButton = ({
  submitting,
  pristine,
  hasSubmitErrors,
  hasValidationErrors,
  dirtySinceLastSubmit,
  dirtyFields,
  text,
  save,
  className,
}) => {
  // console.log('submitting ', submitting)
  return <Button
    type="submit"
    color="primary"
    outline
    size="sm"
    className={className}
    aria-labelledby={text || save}
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
  dirtyFields: PropTypes.object,
  save: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
}

export default SubmitButton
