import PropTypes from 'prop-types'
import React from 'react'
import DropdownList from 'react-widgets/DropdownList'
import { useSelector, useDispatch } from 'react-redux'
import WidgetErrors from './WidgetErrors'
import WidgetMessages from './WidgetMessages'
import FormTextList from './FormTextList'

import { searchObjectsAction, clearSearchObjectsAction } from '../redux/ServerActions'

const DropdownListComp = ({
        input,
        meta,
        search_results,
        isFetching,
        selector,
        onSearch,
        onBlur,
        Actions,
        ...rest
    }) => {
    if (selector) {
        const loaded = useSelector(({
            [selector]: {
                search_results,
                isFetching,
            },
            auth: {
                accessToken
            }
        }) => ({
            search_results,
            isFetching,
            accessToken
        }))
        search_results = loaded.search_results
        isFetching = loaded.isFetching
        const dispatch = useDispatch()
        onSearch = searchObjectsAction(dispatch, Actions, loaded.accessToken)
        onBlur = clearSearchObjectsAction(dispatch, Actions)
    }

	return <>
        <DropdownList
            {...input}
            id={input.name}
            data={search_results}
            placeholder={rest.label}
            dataKey={rest.dataKey}
            textField={rest.textField}
            onSearch={onSearch}
            onBlur={onBlur}
            renderListItem={rest.renderListItem}
            filter={"contains"}
            busy={isFetching}
            invalid={(meta.touched && !!meta.error) ? 'true' : null}
            valid={(meta.touched && !meta.error) ? 'true' : null}
            messages={WidgetMessages}
            // containerClassName={containerClassName}
        />
        <WidgetErrors {...meta} />
        {rest.form_text && <FormTextList form_text={rest.form_text} />}
        </>
    }

export default DropdownListComp