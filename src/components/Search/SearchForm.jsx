import PropTypes from 'prop-types'
import React from 'react'
import SearchField from '../Shared/SearchField'

const SearchForm = ({
        handleSubmit,
        onSubmit,
        submitting,
        invalid,
        pristine
    }) => <form onSubmit={handleSubmit(onSubmit)} className="form-inline my-2 my-lg-0">
            <SearchField name='term' label='Поиск'/>
            <button className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                disabled={submitting || invalid || pristine}>
                Поиск
            </button>
          </form>


SearchForm.propTypes = {
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default SearchForm