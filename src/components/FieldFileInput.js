import PropTypes from 'prop-types'
import React from 'react'

const FieldFileInput = ({input: {
        onChange
    }, className}) => 
        <div>
            <div>
                <input
                    type='file'
                    accept='.jpg, .png, .jpeg'
                    className={className}
                    onChange={(e) => onChange(e.target.files[0])}/>
            </div>
        </div>

const {number, string, func, bool, object} = PropTypes

FieldFileInput.propTypes = {
    onChange: func,
    className: string
}

export default FieldFileInput
