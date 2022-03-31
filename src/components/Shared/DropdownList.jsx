import PropTypes from 'prop-types'
import React from 'react'
import DropdownList from 'react-widgets/DropdownList'
import Listbox from "react-widgets/Listbox"
import { useSelector, useDispatch } from 'react-redux'
import WidgetErrors from './WidgetErrors'
import WidgetMessages from './WidgetMessages'
import FormTextList from './FormTextList'
import { invalid, valid } from './FieldStatus'
import { searchObjectsAction } from '../redux/ServerActions'
import { clearSearchObjects } from '../redux/TempState'

const DropdownListComp = ({
    input: {
        name: input_name,
        ...input
    } = {},
    name = input_name,
    id = name,
    options: {
        [name]: field_props = {}
    } = {},
    label: placeholder = field_props.label,
    required = field_props.required,
    readOnly = field_props.read_only,
    form_text = field_props.help_text,
    meta,
    search_path,
    ...rest
    }) => {
    let from_selector = {}
    // console.log('data_dl: ', meta.data)
    if (search_path) {
        const loaded = useSelector(({
            temp_state: {
                data,
                isFieldFetching
            },
            auth: {
                accessToken
            }
        }) => ({
            data,
            isFieldFetching,
            accessToken
        }))
        const dispatch = useDispatch()
        from_selector = {
            data: loaded.data,
            busy: loaded.isFieldFetching,
            onSearch: searchObjectsAction(dispatch, search_path, loaded.accessToken),
            onBlur: () => dispatch(clearSearchObjects())
        }
    }
    const WidgetComponent = rest.listbox ? Listbox : DropdownList
	return <>
        <WidgetComponent
            {...input}
            {...{name,
                id,
                placeholder,
                required,
                readOnly,
            }}
            filter={() => true}
            invalid={invalid(meta)}
            valid={valid(meta)}
            messages={WidgetMessages}
            {...rest}
            {...from_selector}
        />
        <WidgetErrors {...meta} />
        {form_text && <FormTextList form_text={form_text} />}
        </>
    }

export default DropdownListComp