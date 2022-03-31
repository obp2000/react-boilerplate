import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Field } from 'react-final-form'
import { Form, Row, Col } from 'reactstrap'
import Loader from 'react-loader'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import CityName from '../cities/CityName'
import FormHeader from '../Shared/FormHeader'
import Input from '../Shared/Input'
import DropdownListFormGroup from '../Shared/DropdownListFormGroup'

const CustomerFormRender = props => {
    const loaded = useSelector(({
        customers: {
            object
        },
        temp_state: {
            isFetching
        },
        common_consts: {
            options
        } = {}
    }) => ({
        object,
        options,
        isFetching
    }))
    const options = { options: loaded.options }
    return <Loader loaded={!loaded.isFetching } >
        <Form onSubmit={props.handleSubmit}
              className="shadow p-3 mb-5 bg-body rounded">
            <FormHeader {...loaded.object} {...props} {...options} />
            <Field  name="id"
                    {...options}
                    hidden
                    component={Input} />
            <Row>
                <Col sm={3}>
                    <Field  name="nick"
                            {...options}
                            component={FloatingFormGroup} />
                </Col>
                <Col sm={6}>
                    <Field  name="name"
                            {...options}
                            component={FloatingFormGroup} />
                </Col>
                <Col sm={6}>
                    <Field  name="city"
                            {...options}
                            component={DropdownListFormGroup}
                            dataKey='id'
                            textField={item => CityName(item, loaded.options)}
                            search_path='/cities'
                            label_col_size={2}
                            renderListItem={({ item }) => CityName(item, loaded.options)}
                            renderValue={({ item }) => CityName(item, loaded.options)}
                            />
                </Col>
                <Col sm={8}>
                    <Field  name="address"
                            {...options}
                            component={FloatingFormGroup} />
                </Col>
            </Row>
        </Form>
    </Loader>
}

export default CustomerFormRender