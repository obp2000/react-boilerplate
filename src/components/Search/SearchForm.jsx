import PropTypes from 'prop-types'
import React from 'react'
import { Form, Field } from 'react-final-form'
import renderField from '../Shared/RenderField'
import { validate } from './Validators'

const SearchForm = ({
        onSubmit,
    }) =>
    <Form name={'search'}
          validate={validate}
          onSubmit={onSubmit}
          // enableReinitialize={true}
          >
      {({ handleSubmit, submitting, invalid, pristine }) => (
        <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0">
            <Field name='term' type="search" component={renderField}
                placeholder='Поиск'/>
            <button className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                disabled={submitting || invalid || pristine}>
                Поиск
            </button>
          </form>
      )}
    </Form>

SearchForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default SearchForm