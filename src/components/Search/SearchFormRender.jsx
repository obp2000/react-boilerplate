import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Field } from 'react-final-form'
import { Form, Button } from 'reactstrap'
import Input from '../Shared/Input'
import { TableName } from '../Shared/BasePathname'
import config from '../Config'

const SearchFormRender = ({
    handleSubmit,
    submitting,
    invalid,
    pristine,
    submitError,
    pathname
}) => {
    // const table_name = TableName(pathname) || config.BaseTable
    const loaded = useSelector(({
        common_consts: {
            search = ''
        } = {}
    }) => ({
        search
    }))
    return <Form onSubmit={handleSubmit} inline className="bg-body d-flex">
            <Field  name='term' label={loaded.search} type="search"
                    className="me-2" component={Input} />
            <Button type="submit" outline size="sm"
                    disabled={submitting || invalid || pristine}>
                {loaded.search}
            </Button>
    </Form>
}

export default SearchFormRender