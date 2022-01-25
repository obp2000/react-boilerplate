import PropTypes from 'prop-types'
import React from 'react'
import DropdownList from 'react-widgets/DropdownList'
import WidgetErrors from './WidgetErrors'
import WidgetMessages from './WidgetMessages'
import FormTextList from './FormTextList'

const DropdownListComp = ({
        input,
        meta,
        ...rest
    }) =>
	<>
    <DropdownList
        {...input}
        id={input.name}
        placeholder={rest.label}
        dataKey={rest.dataKey}
        textField={rest.textField}
        data={rest.search_results}
        onSearch={rest.onSearch}
        onBlur={rest.onBlur}
        renderListItem={rest.renderListItem}
        filter={"contains"}
        busy={rest.isFetching}
        invalid={(meta.touched && !!meta.error) ? 'true' : null}
        valid={(meta.touched && !meta.error) ? 'true' : null}
        messages={WidgetMessages}
        // containerClassName={containerClassName}
    />
    <WidgetErrors {...meta} />
    {rest.form_text && <FormTextList form_text={rest.form_text} />}
    </>

export default DropdownListComp