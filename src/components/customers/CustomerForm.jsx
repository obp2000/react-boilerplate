import PropTypes from 'prop-types'
import React from 'react'
import { Form, Field } from 'react-final-form'
import { Container, Row, Col, Form as FormStrap, Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
import Loader from 'react-loader'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import CityField from '../cities/Containers/CityField'
import FormHeader from '../Shared/FormHeader'
import Errors from '../Errors'

import { validate } from './Validators'
import { calculator } from './Selectors'

const CustomerForm = ({
        onSubmit,
        initialValues,
        isFetching,
        errors
    }) =>
    <Form
        name={'customer'}
        validate={validate}
        onSubmit={onSubmit}
        decorators={[calculator]}
        initialValues={initialValues}>
        {({ handleSubmit, submitError, ...rest }) => (
            <FormStrap onSubmit={handleSubmit} className="shadow p-3 mb-5 bg-body rounded">
                {errors && <Errors errors={errors}/>}
                <FormHeader {...{title: 'Покупатель', ...rest}}/>
                    <Row>
                        <Field name="id" label='Id' size={1} disabled component={FloatingFormGroup}/>
                        <Field name="nick" label="Ник*" size={3} component={FloatingFormGroup} />
                        <Field name="name" label="ФИО*" size={6} component={FloatingFormGroup} />
                        <Field name="city" label="Город*" size={6} component={CityField} />
                        <Field name="pindex" label="Индекс" size={2} disabled component={FloatingFormGroup} />
                        <Field name="address" label="Адрес" size={8} component={FloatingFormGroup} />
                    </Row>
            </FormStrap>
        )}
    </Form>

CustomerForm.propTypes = {
    onSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    errors: PropTypes.array
}

CustomerForm.defaultProps = {
    initialValues: {}
}

export default CustomerForm