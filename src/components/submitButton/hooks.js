// import PropTypes from 'prop-types'
import {useOutletContext} from 'react-router-dom'
import {calculatedFields as productCalculatedFields} from '../products/hooks'
import {calculatedFields as orderCalculatedFields} from '../orders/hooks'

const emptyObject = {}

const calculatedFields = [...productCalculatedFields, ...orderCalculatedFields]

const isCalculatedFields = (fields) =>
  Object.keys(fields).every((field) => calculatedFields.includes(field))

export const useSubmitButton = ({
  submitting,
  pristine,
  hasSubmitErrors,
  hasValidationErrors,
  dirtySinceLastSubmit,
  dirtyFields = emptyObject,
  text,
  className,
  isLoading,
}) => {
  const {
    commonConsts: {
        save
    } = emptyObject
  } = useOutletContext() || {}
  const label = text || save
  return {
  	type: "submit",
    className,
    'aria-labelledby': label,
    disabled: submitting ||
              pristine ||
              isCalculatedFields(dirtyFields) ||
              hasValidationErrors ||
              isLoading ||
              (hasSubmitErrors && !dirtySinceLastSubmit),
    children: label,
  }
}

// useSubmitButton.propTypes = {
//   submitting: PropTypes.bool,
//   pristine: PropTypes.bool,
//   hasSubmitErrors: PropTypes.bool,
//   hasValidationErrors: PropTypes.bool,
//   dirtySinceLastSubmit: PropTypes.bool,
//   dirtyFields: PropTypes.object,
//   text: PropTypes.string,
//   className: PropTypes.string,
//   isLoading: PropTypes.bool,
// }
