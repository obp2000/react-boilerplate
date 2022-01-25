import PropTypes from 'prop-types'
import React from 'react'
import { FormGroup, Col } from 'reactstrap'
import DropdownList from '../Shared/DropdownList'
import Label from '../Shared/Label'

const CustomerField = params =>
    <Col sm={params.size}>
        <FormGroup row>
            <Label {...{label_col_size: 2, ...params}} />
            <Col>
                <DropdownList {...{textField: 'nick', ...params}} />
            </Col>
        </FormGroup>
    </Col>

export default CustomerField


            // <Label for={params.input.name} sm={2}>
            //     {params.label}
            // </Label>

// CustomerField.propTypes = {
//     search_results: PropTypes.array.isRequired,
//     isFetching: PropTypes.bool.isRequired,
//     onSearchCustomer: PropTypes.func,
// }


                    // <DropdownList
                    //     {...input}
                    //     id={input.name}
                    //     placeholder={rest.label}
                    //     // dataKey='id'
                    //     textField='nick'
                    //     data={rest.search_results}
                    //     onSearch={rest.onSearch}
                    //     onBlur={rest.onBlur}
                    //     renderListItem={rest.renderListItem}
                    //     filter={"contains"}
                    //     busy={rest.isFetching}
                    //     invalid={(meta.touched && !!meta.error) ? 'true' : null}
                    //     valid={(meta.touched && !meta.error) ? 'true' : null}
                    //     messages={WidgetMessages}
                    //     />
                    // <WidgetErrors {...meta} />
                    // {rest.form_text && <FormTextList form_text={rest.form_text} />}