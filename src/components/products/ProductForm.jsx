import PropTypes from 'prop-types'
import React from 'react'
import { Form, Field } from 'react-final-form'
import renderField from '../Shared/RenderField'
import renderFileField from '../Shared/RenderFileField'
import Loader from 'react-loader'
import SubmitButton from '../Shared/SubmitButton'
import BackButton from '../Shared/Containers/BackButton'
// import FileField from '../Shared/FileField'
import Errors from '../Errors'

import { validate } from './Validators'
import { calculator } from './Selectors'

const ProductForm = ({
        onSubmit,
        initialValues,
        isFetching,
        errors
    }) =>
    <Loader loaded={!isFetching}>
    <Form name={'product'}
          validate={validate}
          onSubmit={onSubmit}
          decorators={[calculator]}
          initialValues={initialValues}>
        {({ handleSubmit, submitting, invalid, pristine, submitError }) => (
            <form onSubmit={handleSubmit} className="form-horizontal">
                {errors && <Errors errors={errors}/>}
                <h4>Ткань</h4>
                <div className="col-sm-12 text-right">
                    <BackButton />
                    &nbsp;
                    <SubmitButton submitDisabled={submitting || invalid || pristine}/>
                </div>
                <div className="form-group row">
                    <label htmlFor="id" className="col-sm-1 col-form-label">
                        Id
                    </label>
                    <div className="col-sm-2">
                        <Field name="id" component={renderField} readOnly/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-1 col-form-label font-weight-bold">
                        Название
                    </label>
                    <div className="col-sm-6">
                        <Field name="name" component={renderField} placeholder="Название"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-1 col-form-label">
                        Фото
                    </label>
                    <div className="col-sm-4">
                        <Field name="new_image" type="file" accept='.jpg, .png, .jpeg'
                            component={renderFileField} className="form-control-file"
                            placeholder="Фото"/>
                        <br/>
                        {initialValues && initialValues.image &&
                            <img src={initialValues.image} width="100px"/>}
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-1 col-form-label">
                        Плотность, гр/м2
                    </label>
                    <div className="col-sm-2">
                        <Field name="density" type="number" component={renderField}
                            placeholder="Плотность, гр/м2"/>
                    </div>
                    <label className="col-sm-2 col-form-label">
                        Плотность для витрины, гр/м2
                    </label>
                    <div className="col-sm-2">
                        <Field name="density_shop" type="number" component={renderField}
                            placeholder="Плотность для витрины, гр/м2"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-1 col-form-label">
                        Ширина, см
                    </label>
                    <div className="col-sm-2">
                        <Field name="width" type="number" component={renderField}
                            placeholder="Ширина, см"/>
                    </div>
                    <label className="col-sm-2 col-form-placeholder">
                        Ширина для витрины, см
                    </label>
                    <div className="col-sm-2">
                        <Field name="width_shop" type="number" component={renderField}
                            placeholder="Ширина для витрины, см"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-1 col-form-label font-weight-bold">
                        Цена, руб./м
                    </label>
                    <div className="col-sm-2">
                        <Field name="price" type="number" component={renderField}
                            placeholder="Цена, руб./м"/>
                    </div>
                    <label className="col-sm-2 col-form-label">
                        Цена до выкупа, руб./м
                    </label>
                    <div className="col-sm-2">
                        <Field name="price_pre" type="number" component={renderField}
                            placeholder="Цена до выкупа, руб./м"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                        Себестоимость, руб./м
                    </label>
                    <div className="col-sm-10">
                        <Field name="prices" component={renderField} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                        Цена, $/кг
                    </label>
                    <div className="col-sm-2">
                        <Field name="dollar_price" type="number"
                            component={renderField} placeholder="Цена, $/кг"/>
                    </div>
                    <label className="col-sm-2 col-form-label">
                        Курс $
                    </label>
                    <div className="col-sm-2">
                        <Field name="dollar_rate" type="number"
                            component={renderField} placeholder="Курс $"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                        Вес отреза, гр
                    </label>
                    <div className="col-sm-2">
                        <Field name="weight_for_count" type="number" component={renderField}
                            placeholder="Вес отреза, гр."/>
                    </div>
                    <label className="col-sm-2 col-form-label"
                        >Длина отреза, м
                    </label>
                    <div className="col-sm-2">
                        <Field name="length_for_count" type="number"
                            component={renderField} placeholder="Длина отреза, м"/>
                    </div>
                    <label className="col-sm-2 col-form-label">
                        Плотность отреза, гр/м2
                    </label>
                    <div className="col-sm-2">
                       <Field name="density_for_count" type="number" component={renderField}
                        readOnly/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                        Вес рулона, кг
                    </label>
                    <div className="col-sm-2">
                        <Field name="weight" type="number"
                            component={renderField} placeholder="Вес рулона, кг"/>
                    </div>
                    <label className="col-sm-2 col-form-label">
                        Метров в рулоне
                    </label>
                    <div className="col-sm-2">
                        <Field name="meters_in_roll" type="number"
                            component={renderField} readOnly/>
                    </div>
                </div>
            </form>
        )}
    </Form>
</Loader>

ProductForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    errors: PropTypes.array
}

// ProductForm.defaultProps = {
//     // density_for_count: 0,
//     // meters_in_roll: 0,
//     // prices: [],
//     image: ''
// }

export default ProductForm