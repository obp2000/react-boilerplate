import PropTypes from 'prop-types'
import React from 'react'
import { Form } from 'react-final-form'
import Loader from 'react-loader'
import SubmitButton from '../Shared/SubmitButton'
import BackButton from '../Shared/Containers/BackButton'
import TextField from '../Shared/TextField'
import NumberField from '../Shared/NumberField'
import IntegerField from '../Shared/IntegerField'
import FileField from '../Shared/FileField'

import { validate } from './Validators'
import { calculator } from './Selectors'

const ProductForm = ({
        onSubmit,
        initialValues,
        isFetching,
    }) =>
    <Loader loaded={!isFetching}>
    <Form name={'product'}
          validate={validate}
          onSubmit={onSubmit}
          decorators={[calculator]}
          initialValues={initialValues}>
        {({ handleSubmit, submitting, invalid, pristine }) => (
            <form onSubmit={handleSubmit} className="form-horizontal">
                <h4>Ткань</h4>
                <div className="col-sm-12 text-right">
                    <BackButton />
                    &nbsp;
                    <SubmitButton submitDisabled={submitting || invalid || pristine}/>
                </div>
                <div className="form-group row">
                    <label htmlFor="id" className="col-sm-1 col-form-label">Id</label>
                    <div className="col-sm-2">
                        <TextField name="id" readOnly/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-1 col-form-label font-weight-bold">Название</label>
                    <div className="col-sm-6">
                        <TextField name="name" label="Название"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-1 col-form-label">Фото</label>
                    <div className="col-sm-4">
                        <FileField name="new_image" label="Фото"/>
                        <br/>
                        {initialValues.image && <img src={initialValues.image} width="100px"/>}
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-1 col-form-label">Плотность, гр/м2</label>
                    <div className="col-sm-2">
                        <IntegerField name="density" label="Плотность, гр/м2"/>
                    </div>
                    <label className="col-sm-2 col-form-label">Плотность для витрины, гр/м2</label>
                    <div className="col-sm-2">
                        <IntegerField name="density_shop" label="Плотность для витрины, гр/м2"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-1 col-form-label">Ширина, см</label>
                    <div className="col-sm-2">
                        <IntegerField name="width" label="Ширина, см"/>
                    </div>
                    <label className="col-sm-2 col-form-label">Ширина для витрины, см</label>
                    <div className="col-sm-2">
                        <IntegerField name="width_shop" label="Ширина для витрины, см"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-1 col-form-label font-weight-bold">Цена, руб./м</label>
                    <div className="col-sm-2">
                        <IntegerField name="price" label="Цена, руб./м"/>
                    </div>
                    <label className="col-sm-2 col-form-label">Цена до выкупа, руб./м</label>
                    <div className="col-sm-2">
                        <IntegerField name="price_pre" label="Цена до выкупа, руб./м"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Себестоимость, руб./м</label>
                    <div className="col-sm-10">
                        <TextField name="prices" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Цена, $/кг</label>
                    <div className="col-sm-2">
                        <NumberField name="dollar_price" label="Цена, $/кг"/>
                    </div>
                    <label className="col-sm-2 col-form-label">Курс $</label>
                    <div className="col-sm-2">
                        <NumberField name="dollar_rate" label="Курс $"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Вес отреза, гр</label>
                    <div className="col-sm-2">
                        <IntegerField name="weight_for_count" label="Вес отреза, гр."/>
                    </div>
                    <label className="col-sm-2 col-form-label">Длина отреза, м</label>
                    <div className="col-sm-2">
                        <NumberField name="length_for_count" label="Длина отреза, м"/>
                    </div>
                    <label className="col-sm-2 col-form-label">Плотность отреза, гр/м2</label>
                    <div className="col-sm-2">
                       <IntegerField name="density_for_count" readOnly/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Вес рулона, кг</label>
                    <div className="col-sm-2">
                        <NumberField name="weight" label="Вес рулона, кг"/>
                    </div>
                    <label className="col-sm-2 col-form-label">Метров в рулоне</label>
                    <div className="col-sm-2">
                        <NumberField name="meters_in_roll" readOnly/>
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
}

// ProductForm.defaultProps = {
//     // density_for_count: 0,
//     // meters_in_roll: 0,
//     // prices: [],
//     image: ''
// }

export default ProductForm