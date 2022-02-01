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
        options: data = [],
        label: placeholder,
        isFieldFetching: busy,
        search_path,
        Actions,
        listbox,
        form_text,
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
            onBlur: clearSearchObjectsAction(dispatch)}
    }
    const WidgetComponent = listbox ? Listbox : DropdownList
	return <>
        <WidgetComponent
            {...input}
            id={input.name}
            data={data}
            placeholder={placeholder}
            filter={"contains"}
            busy={busy}
            invalid={invalid(meta)}
            valid={valid(meta)}
            messages={WidgetMessages}
            // containerClassName={containerClassName}
            {...rest}
            {...from_selector}
        />
        <WidgetErrors {...meta} />
        {form_text && <FormTextList form_text={form_text} />}
        </>
    }

export default DropdownListComp