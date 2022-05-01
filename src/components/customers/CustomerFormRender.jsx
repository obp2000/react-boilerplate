import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'react-final-form'
import { Form, Row, Col } from 'reactstrap'
import { toast } from 'react-toastify'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import FormHeader from '../Shared/FormHeader'
import Input from '../Shared/Input'
// import Errors from '../Shared/Errors'
import CityName from '../cities/CityName'
import DropdownListFormGroup from '../Shared/DropdownListFormGroup'
import { cityLabels } from '../redux/Cities'

const CustomerFormRender = props => {
    const options = props.options
    const city_labels = cityLabels(options?.city?.children)
    // console.log("props ", props)
    return <Form    onSubmit={props.handleSubmit}
                    className="shadow p-3 mb-5 bg-body rounded">
            <FormHeader {...props} />
            <Field  name="id"
                    {...{ options }}
                    hidden
                    component={Input} />
            <Row>
                <Col sm={3}>
                    <Field  name="nick"
                            {...{ options }}
                            component={FloatingFormGroup} />
                </Col>
                <Col sm={6}>
                    <Field  name="name"
                            {...{ options }}
                            component={FloatingFormGroup} />
                </Col>
                <Col sm={6}>
                    <Field  name="city"
                            component={DropdownListFormGroup}
                            dataKey='id'
                            textField={item => CityName(item, city_labels)}
                            search_path='/cities/'
                            label_col_size={2}
                            renderListItem={({ item }) => CityName(item, city_labels)}
                            renderValue={({ item }) => CityName(item, city_labels)}
                            {...{ options }}
                    />
                </Col>
                <Col sm={8}>
                    <Field  name="address"
                            {...{ options }}
                            component={FloatingFormGroup} />
                </Col>
            </Row>
        </Form>
}

export default CustomerFormRender
