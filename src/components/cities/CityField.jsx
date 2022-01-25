import PropTypes from 'prop-types'
import React from 'react'
import { FormGroup, Col } from 'reactstrap'
import DropdownList from '../Shared/DropdownList'
import Label from '../Shared/Label'

const renderListItem = ({ item }) =>
    <> { item.city } инд. { item.pindex } </>

const CityField = params =>
    <Col sm={params.size}>
        <FormGroup row>
            <Label {...{label_col_size: 2, ...params}} />
            <Col>
                <DropdownList {...{renderListItem, textField: 'city', ...params}} />
            </Col>
        </FormGroup>
    </Col>

export default CityField


            // <Label for={params.input.name} sm={2}>
            //     {params.label}
            // </Label>


                    // <DropdownList
                    //     {...input}
                    //     id={input.name}
                    //     placeholder={rest.label}
                    //     dataKey='id'
                    //     textField='city'
                    //     data={rest.search_results}
                    //     onSearch={rest.onSearch}
                    //     onBlur={rest.onBlur}
                    //     renderListItem={renderListItem}
                    //     filter={"contains"}
                    //     busy={rest.isFetching}
                    //     invalid={(meta.touched && !!meta.error) ? 'true' : null}
                    //     valid={(meta.touched && !meta.error) ? 'true' : null}
                    //     messages={WidgetMessages}
                    //     // containerClassName={containerClassName}
                    //     />
                    // <WidgetErrors {...meta} />
                    // {rest.form_text && <FormTextList form_text={rest.form_text} />}