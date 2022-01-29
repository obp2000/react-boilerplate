import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form'
import { Form as FormStrap, Row, Col, Button } from 'reactstrap'
import Input from '../Shared/Input'
import { validate } from './Validators'
import { onSubmit } from '../redux/Search'

const SearchForm = ({
    location: {
        pathname
    }
}) => {
    const dispatch = useDispatch()
    return <Form name={'search'}
              // validate={validate}
              onSubmit={onSubmit(dispatch, pathname)}
              >
          {({ handleSubmit, submitting, invalid, pristine }) => (
            <FormStrap onSubmit={handleSubmit} inline className="bg-body d-flex">
                        <Field name='term' label='Поиск' type="search"
                            className="me-2" component={Input} />
                        <Button type="submit" outline size="sm"
                            disabled={submitting || invalid || pristine}>
                            Поиск
                        </Button>
              </FormStrap>
          )}
        </Form>
}

SearchForm.propTypes = {
    pathname: PropTypes.string,
}

export default SearchForm