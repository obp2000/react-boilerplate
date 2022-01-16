import PropTypes from 'prop-types'
import React from 'react'
// import { Form, Field } from 'redux-form'
import { Form } from 'react-final-form'
import Loader from 'react-loader'
import SubmitButton from '../Shared/SubmitButton'
import BackButton from '../Shared/Containers/BackButton'
import TextField from '../Shared/TextField'
import FormRow from './FormRow'
import CityField from '../cities/Containers/CityField'

import { validate } from './Validators'
import { calculator } from './Selectors'

const CustomerForm = ({
    onSubmit,
    initialValues,
    isFetching,
}) => <Loader loaded={!isFetching}>
    <Form name={'customer'}
          validate={validate}
          onSubmit={onSubmit}
          decorators={[calculator]}
          // enableReinitialize={true}
          initialValues={initialValues}>
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
                <TextField name="pindex" readOnly={true}/>
            </FormRow>
            <FormRow label='Адрес'>
                <TextField name="address" label="Адрес"/>
            </FormRow>
        </form>
      )}
    </Form>
    </Loader>

CustomerForm.propTypes = {
    onSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
}

export default CustomerForm