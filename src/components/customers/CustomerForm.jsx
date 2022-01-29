import PropTypes from 'prop-types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form'
import { Form as FormStrap, Row, Col } from 'reactstrap'
import Loader from 'react-loader'
// import { onSubmit } from '../redux/Customers'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import CityField from '../cities/CityField'
import FormHeader from '../Shared/FormHeader'
import { validate } from './Validators'
import { calculator } from './Selectors'

import { onSubmitAction } from '../redux/ServerActions'
import { Actions } from '../redux/Customers'

const CustomerForm = () => {
    const loaded = useSelector(({
        customers: {
            object,
            isFetching,
        },
        auth: {
            accessToken
        }
    }) => ({
        object,
        isFetching,
        accessToken
    }))
    const dispatch = useDispatch()
    return <Form
            name={'customer'}
            validate={validate}
            onSubmit={onSubmitAction(dispatch, Actions, loaded.accessToken)}
            decorators={[calculator]}
            initialValues={loaded.object}>
            {({ handleSubmit, submitError, ...rest }) => (
                <FormStrap onSubmit={handleSubmit}
                           className="shadow p-3 mb-5 bg-body rounded">
                    <FormHeader {...{title: 'Покупатель', ...rest}}/>
                    <Row>
                        <Col sm={1}>
                            <Field name="id" label='Id'
                                disabled component={FloatingFormGroup}/>
                        </Col>
                        <Col sm={3}>
                            <Field name="nick" label="Ник*"
                                component={FloatingFormGroup} />
                        </Col>
                        <Col sm={6}>
                            <Field name="name" label="ФИО*"
                                component={FloatingFormGroup} />
                        </Col>
                        <Col sm={6}>
                            <Field name="city" label="Город*"
                                component={CityField} />
                        </Col>
                        <Col sm={2}>
                            <Field name="pindex" label="Индекс"
                                disabled component={FloatingFormGroup} />
                        </Col>
                        <Col sm={8}>
                            <Field name="address" label="Адрес"
                                component={FloatingFormGroup} />
                        </Col>
                    </Row>
                </FormStrap>
            )}
        </Form>
}

export default CustomerForm