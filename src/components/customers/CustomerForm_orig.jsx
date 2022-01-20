import PropTypes from 'prop-types'
import React from 'react'
// import {
//     Form,
//     Field
// } from 'redux-form'
import { Form, Field } from 'react-final-form'
import Loader from 'react-loader'
import SubmitButton from '../Shared/SubmitButton'
import BackButton from '../Shared/Containers/BackButton'
import TextField from '../Shared/TextField'
import FormRow from './FormRow'
import comboboxComponent from '../renderCombobox'
import CityField from '../cities/Containers/CityField'

import { validate } from './Validators'
import { onSubmit, onSubmitSuccess } from '../redux/Customers'

// export const setReduxForm = () => reduxForm({
//     form: 'customer',
//     validate,
//     onSubmit,
//     onSubmitSuccess,
//     enableReinitialize: true
// })

const CustomerForm = ({
    // handleSubmit,
    onSubmit,
    // submitting,
    // invalid,
    // pristine,
    isFetching,
    pindex
}) => <Loader loaded={!isFetching}>
    <Form name={'customer'}
          validate={validate}
          onSubmit={() => alert('sss')}
          onSubmitSuccess={onSubmitSuccess}
          enableReinitialize={true}>
      {({ handleSubmit, submitting, invalid, pristine }) => (
        <form onSubmit={handleSubmit} className="form-horizontal">
            <h4>Покупатель</h4>
            <div className="col-sm-12 text-right">
                <BackButton />
                &nbsp;
                <SubmitButton submitDisabled={submitting || invalid || pristine}/>
            </div>
            <FormRow label='Id'>
                <TextField name="id" readOnly={true}/>
            </FormRow>
            <FormRow label='Ник' strong_label>
                <TextField name="nick" label="Ник"/>
            </FormRow>
            <FormRow label='ФИО' strong_label>
                <TextField name="name" label="ФИО"/>
            </FormRow>
            <FormRow label='Город' strong_label>
                <CityField />
            </FormRow>
            <FormRow label='Индекс'>
                {pindex}
            </FormRow>
            <FormRow label='Адрес'>
                <TextField name="address" label="Адрес"/>
            </FormRow>
        </form>
      )}
    </Form>
    </Loader>

CustomerForm.propTypes = {
    // submitting: PropTypes.bool,
    // invalid: PropTypes.bool.isRequired,
    // pristine: PropTypes.bool.isRequired,
    // handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    isFetching: PropTypes.bool.isRequired,
    pindex: PropTypes.string,
}

export default CustomerForm