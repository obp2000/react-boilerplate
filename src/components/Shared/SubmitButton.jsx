import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'reactstrap'

const SubmitButton = ({submitDisabled, text='Сохранить'}) => <Button
        type="submit"
        color="primary"
        outline
        size="sm"
        disabled={submitDisabled}>{text}
</Button>

SubmitButton.propTypes = {
  submitDisabled: PropTypes.bool,
}

export default SubmitButton
