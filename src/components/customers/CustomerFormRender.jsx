import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Field } from 'react-final-form'
import { Form, Row, Col } from 'reactstrap'
import Loader from 'react-loader'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import CityField from '../cities/CityField'
import FormHeader from '../Shared/FormHeader'
import Input from '../Shared/Input'

const CustomerFormRender = props => {
    const loaded = useSelector(({
        customers: {
            object: {
                id,
                options = {}
            }
        },
        temp_state: {
            isFetching
        }
    }) => ({
        id,
        options,
        isFetching
    }))
    return <Loader loaded={!loaded.isFetching } >
        <Form onSubmit={props.handleSubmit}
          	  className="shadow p-3 mb-5 bg-body rounded">
            <FormHeader {...props} id={loaded.id} options={loaded.options} />
            <Field  name="id" options={loaded.options} hidden
                	component={Input} />
            <Row>
                <Col sm={3}>
                    <Field  name="nick" options={loaded.options}
                            component={FloatingFormGroup} />
                </Col>
                <Col sm={6}>
                    <Field  name="name" options={loaded.options}
                            component={FloatingFormGroup} />
                </Col>
                <Col sm={6}>
                    <Field  name="city" options={loaded.options}
    		             	component={CityField} />
                </Col>
                <Col sm={8}>
                    <Field  name="address" options={loaded.options}
                            component={FloatingFormGroup} />
                </Col>
            </Row>
        </Form>
    </Loader>
}

export default CustomerFormRender