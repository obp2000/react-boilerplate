import PropTypes from 'prop-types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form'
import { Form as FormStrap, Row, Col } from 'reactstrap'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import ImageFormGroup from '../Shared/ImageFormGroup'
import Loader from 'react-loader'
import FormHeader from '../Shared/FormHeader'
import ProductImage from './ProductImage'
import { validate } from './Validators'
import { calculator } from './Selectors'

import { onSubmitAction } from '../redux/ServerActions'
import { Actions } from '../redux/Products'

const ProductForm = () => {
    const loaded = useSelector(({
        products: {
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
    return <Form name={'product'}
        validate={validate}
        onSubmit={onSubmitAction(dispatch, Actions, loaded.accessToken)}
        decorators={[calculator]}
        initialValues={loaded.object}>
        {({ handleSubmit, submitError, ...rest }) => (
            <FormStrap onSubmit={handleSubmit} className="shadow p-3 mb-5 bg-body rounded" >
                <FormHeader {...{title: 'Ткань', ...rest}}/>
                    <Row>
                        <Col sm={2}>
                            <Field name="id" label="Id"
                                   disabled component={FloatingFormGroup} />
                        </Col>
                        <Col sm={2}>
                            <ProductImage image={loaded.object.image} />
                        </Col>
                        <Col sm={8}>
                            <Field name="name" label="Название*"
                                   component={FloatingFormGroup} />
                        </Col>
                        <Col sm={2}>
                            <Field name="price" label="Цена, руб./м*"
                                   type='number' component={FloatingFormGroup} />
                        </Col>
                        <Col sm={2}>
                            <Field name="price_pre" label="Цена до выкупа, руб./м"
                                   type='number' component={FloatingFormGroup} />
                        </Col>
                        <Col sm={2}>
                            <Field name="width" label="Ширина, см"
                                   type='number' component={FloatingFormGroup} />
                        </Col>
                        <Col sm={2}>
                            <Field name="density" label="Плотность, гр/м2"
                                   type='number' component={FloatingFormGroup} />
                        </Col>
                        <Col sm={2}>
                            <Field name="width_shop" label="Ширина для витрины, см"
                                   type='number' component={FloatingFormGroup} />
                        </Col>
                        <Col sm={2}>
                            <Field name="density_shop" label="Плотность для витрины, гр/м2"
                                   type='number' component={FloatingFormGroup} />
                        </Col>
                        <Col sm={3}>
                            <Field name="new_image" label="Фото"
                                   component={ImageFormGroup} />
                        </Col>
                        <Col sm={2}>
                            <Field name="dollar_price" label="Цена, $/кг"
                                   type='number' component={FloatingFormGroup} />
                        </Col>
                        <Col sm={2}>
                            <Field name="dollar_rate" label="Курс $"
                                   type='number' component={FloatingFormGroup} />
                        </Col>
                        <Col sm={2}>
                            <Field name="weight_for_count" label="Вес отреза, гр"
                                   type='number' component={FloatingFormGroup} />
                        </Col>
                        <Col sm={2}>
                            <Field name="length_for_count" label="Длина отреза, м"
                                   type='number' component={FloatingFormGroup} />
                        </Col>
                        <Col sm={2}>
                            <Field name="weight" label="Вес рулона, кг"
                                   type='number' component={FloatingFormGroup} />
                        </Col>
                        <Col sm={9}>
                            <Field name="prices" label="Себестоимость, руб./м"
                                   disabled component={FloatingFormGroup} />
                        </Col>
                        <Col sm={3}>
                            <Field name="density_for_count" label="Плотность отреза, гр/м2"
                                   disabled component={FloatingFormGroup} />
                        </Col>
                        <Col sm={2}>
                            <Field name="meters_in_roll" label="Метров в рулоне"
                               disabled component={FloatingFormGroup} />
                        </Col>
                    </Row>
                </FormStrap>
    )}
    </Form>
}

export default ProductForm