import PropTypes from 'prop-types'
import React from 'react'
import {
    Form,
    Field
} from 'redux-form'
import Loader from 'react-loader'
import SubmitButton from '../Shared/SubmitButton'
import BackButton from '../Shared/BackButton'
import TextField from '../Shared/TextField'
import FormRow from './FormRow'
import comboboxComponent from '../renderCombobox'

const CustomerForm = ({
    handleSubmit,
    onSubmit,
    submitting,
    invalid,
    pristine,
    isFetching,
    goBack,
    pindex,
    cities,
    onChangeCity
}) => <Loader loaded={!isFetching}>
        <Form onSubmit={handleSubmit(onSubmit)} className="form-horizontal">
            <h4>Покупатель</h4>
            <div className="col-sm-12 text-right">
                <BackButton goBack={goBack}/>
                &nbsp;
                <SubmitButton submitDisabled={submitting || invalid || pristine}/>
            </div>
            <FormRow label='Id'>
                <TextField name="id" readOnly={true}/>
            </FormRow>
            <FormRow label='Ник'>
                <TextField name="nick" label="Ник"/>
            </FormRow>
            <FormRow label='ФИО'>
                <TextField name="name" label="ФИО"/>
            </FormRow>
            <FormRow label='Город'> 
                <Field name='city' 
                       component={comboboxComponent} 
                       data={cities.results}
                       textField='city' 
                       valueField='pindex' 
                       isFetching={cities.isFetching}
                       onChange={onChangeCity}
                />
            </FormRow>
            <FormRow label='Индекс'>
                {pindex}
            </FormRow>
            <FormRow label='Адрес'>
                <TextField name="address" label="Адрес"/>
            </FormRow>
        </Form>
    </Loader>

CustomerForm.propTypes = {
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    goBack: PropTypes.func.isRequired,
    pindex: PropTypes.string,
    onChangeCity: PropTypes.func,
    cities: PropTypes.object
}

export default CustomerForm