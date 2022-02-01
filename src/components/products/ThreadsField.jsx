import PropTypes from 'prop-types'
import React from 'react'
import DropdownListFormGroup from '../Shared/DropdownListFormGroup'

const ThreadsField = DropdownListFormGroup({
    label_col_size: 2,
    dataKey: 'value',
    textField: 'display_name',
    // listbox: true
})

export default ThreadsField


// import PropTypes from 'prop-types'
// import React from 'react'
// import { ButtonGroup, Button } from 'reactstrap'
// // import { useSelector, useDispatch } from 'react-redux'
// import Label from '../Shared/Label'

// const RadioButton = (params) => {
//   return <div className="form-check form-check-inline">
//             <input className="form-check-input" type="radio" name={params.name}
//                 id={params.name} value={params.value} checked={params.checked} />
//             <label className="form-check-label" for={params.name}>
//                 {params.display_name}
//             </label>
//           </div>

// {    return <Button name={params.name} value={params.value}
//             active={params.active}
//             onClick={function noRefCheck(){}} >
//                 {params.display_name}
//             </Button>}
// }


// const ThreadsField = (params) => {
//     return <>
//         <ButtonGroup>
//             <Label {...{label_col_size: 2, ...params}} />
//             <RadioButton name={params.input.name} value
//                 display_name={'Нет'}  key={-1} />
//             {params.options && params.options.map((option, key) =>
//                 <RadioButton name={params.input.name} value={option.value}
//                     display_name={option.display_name}  key={key}
//                     checked={params.input.value == option.value}
//                     />)}
//             {console.log('input.value: ', params.input.value)}
//         </ButtonGroup>
//     </>
// }

// export default ThreadsField