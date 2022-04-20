import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Field } from 'react-final-form'
import { Form, Button } from 'reactstrap'
import Input from '../Shared/Input'
import SubmitButton from '../Shared/SubmitButton'
import { selectCommonConsts } from '../redux/CommonConsts'

const SearchFormRender = props => {
    const searchLabel = useSelector(selectCommonConsts).search
    return <Form    onSubmit={props.handleSubmit}
                    inline
                    className="d-flex mt-2">
            <Field  name='term'
                    type="search"
                    label={props.search}
                    className="me-2"
                    component={Input} />
{/*            <Button type="submit" color='primary' className='btn-outline-light'
                    // disabled={submitting || invalid}
                    >
                {searchLabel}
            </Button>*/}
            <SubmitButton   text={props.search}
                            className='btn-outline-light'
                            {...props} />
    </Form>
}

export default SearchFormRender
