import PropTypes from 'prop-types'
import React from 'react'
import { Form, Field } from 'react-final-form'
import { Form as FormStrap, Row, Col, Card, CardBody, CardTitle, CardImg } from 'reactstrap'
// import FormGroup from './FormGroup'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import ImageFormGroup from '../Shared/ImageFormGroup'
import Loader from 'react-loader'
import FormHeader from '../Shared/FormHeader'
import ImageCol from './ImageCol'
import Errors from '../Errors'

import { validate } from './Validators'
import { calculator } from './Selectors'

const ProductForm = ({
        onSubmit,
        initialValues,
        isFetching,
        errors
    }) =>
    <Form name={'product'}
        validate={validate}
        onSubmit={onSubmit}
        decorators={[calculator]}
        initialValues={initialValues}>
        {({ handleSubmit, submitError, ...rest }) => (
            <FormStrap onSubmit={handleSubmit} className="shadow p-3 mb-5 bg-body rounded" >
                {errors && <Errors errors={errors}/>}
                <FormHeader {...{title: 'Ткань', ...rest}}/>
                    <Row>
                        <Field name="id" label="Id" size={2} disabled component={FloatingFormGroup} />
                        <ImageCol image={initialValues.image} size={2} />
                        <Field name="name" label="Название*" size={8} component={FloatingFormGroup} />
                        <Field name="price"
                            label="Цена, руб./м*"
                            type='number'
                            size={2}
                            component={FloatingFormGroup}
                            // format={(value) => value + 'руб./м'}
                            // parse={(value) => value.replace('руб./м', '')}
                            // formatOnBlur={true}
                        />
                        <Field name="price_pre" label="Цена до выкупа, руб./м" type='number' size={2} component={FloatingFormGroup} />
                        <Field name="width" label="Ширина, см" type='number' size={2} component={FloatingFormGroup} />
                        <Field name="density" label="Плотность, гр/м2" type='number' size={2} component={FloatingFormGroup} />
                        <Field name="width_shop" label="Ширина для витрины, см" type='number' size={2} component={FloatingFormGroup} />
                        <Field name="density_shop" label="Плотность для витрины, гр/м2" type='number' size={2} component={FloatingFormGroup} />
                        <Field name="new_image" label="Фото" size={3} component={ImageFormGroup} />
                        <Field name="dollar_price" label="Цена, $/кг" type='number' size={2} component={FloatingFormGroup} />
                        <Field name="dollar_rate" label="Курс $" type='number' size={2} component={FloatingFormGroup} />
                        <Field name="weight_for_count" label="Вес отреза, гр" type='number' size={2} component={FloatingFormGroup} />
                        <Field name="length_for_count" label="Длина отреза, м" type='number' size={2} component={FloatingFormGroup} />
                        <Field name="weight" label="Вес рулона, кг" type='number' size={2} component={FloatingFormGroup} />
                        <Field name="prices" label="Себестоимость, руб./м" size={9} disabled component={FloatingFormGroup} />
                        <Field name="density_for_count" label="Плотность отреза, гр/м2" size={3} disabled component={FloatingFormGroup} />
                        <Field name="meters_in_roll" label="Метров в рулоне" size={2} disabled component={FloatingFormGroup} />
                    </Row>
        </FormStrap>
    )}
    </Form>

ProductForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    errors: PropTypes.array
}

ProductForm.defaultProps = {
    initialValues: {}
}

export default ProductForm