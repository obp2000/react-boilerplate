import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Field } from 'react-final-form'
import { Form, Row, Col } from 'reactstrap'
import Loader from 'react-loader'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import SelectFloatingFormGroup from '../Shared/SelectFloatingFormGroup'
import ImageFormGroup from '../Shared/ImageFormGroup'
import SwitchFormGroup from '../Shared/SwitchFormGroup'
import FormHeader from '../Shared/FormHeader'
import Input from '../Shared/Input'
import blank from '../../assets/img/blank.png'

const ProductFormRender = props => {
    const loaded = useSelector(({
        products: {
            object: {
                id,
            	image,
                options = {},
                options: {
                    image: {
                        label: image_label = ''
                    } = {}
                } = {}
            } = {}
        },
        temp_state: {
            isFetching
        }
    }) => ({
        id,
        image,
        options,
        image_label,
        isFetching
    }))
    const options = {options: loaded.options}
    return <Loader loaded={!loaded.isFetching }>
        <Form onSubmit={props.handleSubmit}
          	  className="shadow p-3 mb-5 bg-body rounded">
            <FormHeader {...props} id={loaded.id} {...options} />
            <Field  name="id" {...options} hidden
                    component={Input} />
            <Row>
            	<Col sm={2}>
                    <img alt={loaded.image_label}
                         src={loaded.image || String(blank)}
                         className='img-thumbnail rounded float-start'
                    />
                </Col>
                <Col sm={8}>
                    <Field name="name" {...options}
                           component={FloatingFormGroup} />
                </Col>
                <Col sm={4}>
                    <SelectFloatingFormGroup name="product_type"
                        dataKey='id' textField='name'
                        {...options} />
                </Col>
                <Col sm={4}>
                    <SelectFloatingFormGroup name="threads"
                        dataKey='value' textField='display_name'
                        {...options} />
                </Col>
                <Col sm={4}>
                    <SelectFloatingFormGroup name="contents"
                        dataKey='value' textField='display_name'
                        {...options} />
                </Col>
                <Col sm={2}>
                    <Field  name="fleece" {...options}
                            component={SwitchFormGroup}/>
                </Col>
                <Col sm={2}>
                    <Field name="price" {...options}
                           type='number' component={FloatingFormGroup} />
                </Col>
                <Col sm={2}>
                    <Field name="price_pre" {...options}
                           type='number' component={FloatingFormGroup} />
                </Col>
                <Col sm={2}>
                    <Field name="width" {...options}
                           type='number' component={FloatingFormGroup} />
                </Col>
                <Col sm={2}>
                    <Field name="density" {...options}
                           type='number' component={FloatingFormGroup} />
                </Col>
                <Col sm={2}>
                    <Field name="width_shop" {...options}
                           type='number' component={FloatingFormGroup} />
                </Col>
                <Col sm={2}>
                    <Field name="density_shop" {...options}
                           type='number' component={FloatingFormGroup} />
                </Col>
                <Col sm={3}>
                    <Field name="new_image" {...options}
                           component={ImageFormGroup} />
                </Col>
                <Col sm={2}>
                    <Field name="dollar_price" {...options}
                           type='number' component={FloatingFormGroup} />
                </Col>
                <Col sm={2}>
                    <Field name="dollar_rate" {...options}
                           type='number' component={FloatingFormGroup} />
                </Col>
                <Col sm={2}>
                    <Field name="weight_for_count" {...options}
                           type='number' component={FloatingFormGroup} />
                </Col>
                <Col sm={2}>
                    <Field name="length_for_count" {...options}
                           type='number' component={FloatingFormGroup} />
                </Col>
                <Col sm={2}>
                    <Field name="weight" {...options}
                           type='number' component={FloatingFormGroup} />
                </Col>
                <Col sm={9}>
                    <Field name="prices" {...options}
                           disabled component={FloatingFormGroup} />
                </Col>
                <Col sm={3}>
                    <Field name="density_for_count" {...options}
                           disabled component={FloatingFormGroup} />
                </Col>
                <Col sm={2}>
                    <Field name="meters_in_roll" {...options}
                       disabled component={FloatingFormGroup} />
                </Col>
            </Row>
        </Form>
    </Loader>
}

export default ProductFormRender