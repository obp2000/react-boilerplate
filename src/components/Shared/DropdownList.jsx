import PropTypes from 'prop-types'
import React from 'react'
import DropdownList from 'react-widgets/DropdownList'
import Listbox from "react-widgets/Listbox"
import { useSelector, useDispatch } from 'react-redux'
import WidgetErrors from './WidgetErrors'
import WidgetMessages from './WidgetMessages'
import FormTextList from './FormTextList'
import { invalid, valid } from './FieldStatus'

import { searchObjectsAction, clearSearchObjectsAction } from '../redux/ServerActions'

const DropdownListComp = ({
        input,
        meta,
        options,
        // label: placeholder,
        // isFieldFetching: busy,
        search_path,
        // Actions,
        listbox,
        // read_only,
        // form_text,
        ...rest
    }) => {
    let field = {}
    if (options) {
        const field_options = options[input.name] || {}
        field = { ...field_options,
                  readOnly: field_options.read_only,
                  placeholder: field_options.label
                }
    } else {
        field = { placeholder: rest.label }
    }
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
            onBlur: clearSearchObjectsAction(dispatch)
        }
    }
    const WidgetComponent = listbox ? Listbox : DropdownList
	return <>
        <WidgetComponent
            {...input}
            {...field}
            id={input.name}
            // data={data}
            // placeholder={placeholder}
            // readOnly={read_only}
            filter={() => true}
            // busy={busy}
            invalid={invalid(meta)}
            valid={valid(meta)}
            messages={WidgetMessages}
            {...rest}
            {...from_selector}
        />
        <WidgetErrors {...meta} />
        {rest.form_text && <FormTextList form_text={rest.form_text} />}
        </>
    }

export default DropdownListComp