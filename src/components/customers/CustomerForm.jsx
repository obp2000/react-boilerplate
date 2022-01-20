import PropTypes from 'prop-types'
import React from 'react'
import { Form, Field } from 'react-final-form'
import renderField from '../Shared/RenderField'
import Loader from 'react-loader'
import SubmitButton from '../Shared/SubmitButton'
import BackButton from '../Shared/Containers/BackButton'
import FormRow from './FormRow'
import CityField from '../cities/Containers/CityField'
import Errors from '../Errors'

import { validate } from './Validators'
import { calculator } from './Selectors'

const CustomerForm = ({
    onSubmit,
    initialValues,
    isFetching,
    errors
}) => <Loader loaded={!isFetching}>
    <Form name={'customer'}
          validate={validate}
          onSubmit={onSubmit}
          decorators={[calculator]}
          // enableReinitialize={true}
          initialValues={initialValues}>
      {({ handleSubmit, submitting, invalid, pristine, submitError }) => (
        <form onSubmit={handleSubmit} className="form-horizontal">
            {errors && <Errors errors={errors}/>}
            <h4>Покупатель</h4>
            <div className="col-sm-12 text-right">
                <BackButton />
                &nbsp;
                <SubmitButton submitDisabled={submitting || invalid || pristine}/>
            </div>
            <FormRow label='Id'>
                <Field name="id" component={renderField} readOnly/>
            </FormRow>
            <FormRow label='Ник' strong_label>
                <Field name="nick" component={renderField} placeholder="Ник"/>
            </FormRow>
            <FormRow label='ФИО' strong_label>
                <Field name="name" component={renderField} placeholder="ФИО"/>
            </FormRow>
            <FormRow label='Город' strong_label>
                <CityField />
            </FormRow>
            <FormRow label='Индекс'>
                <Field name="pindex" component={renderField} readOnly/>
            </FormRow>
            <FormRow label='Адрес'>
                <Field name="address" component={renderField} placeholder="Адрес"/>
            </FormRow>
        </form>
      )}
    </Form>
    </Loader>

CustomerForm.propTypes = {
    onSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    errors: PropTypes.array
}

export default CustomerForm