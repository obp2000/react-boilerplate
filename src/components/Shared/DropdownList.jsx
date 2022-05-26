import PropTypes from 'prop-types'
import React, {useState} from 'react'
import DropdownList from 'react-widgets/DropdownList'
import Listbox from 'react-widgets/Listbox'
import {useSelector, useDispatch} from 'react-redux'
import WidgetErrors from './WidgetErrors'
import widgetMessages from './WidgetMessages'
import FormTextList from './FormTextList'
import {searchObjects} from '../../services/apiSlice'
import {getFormText, getFieldAttrs} from './FieldProps'

const DropdownListComp = ({
  input,
  meta,
  options,
  search_path: searchPath,
  not_found: notFound,
  ...props
}) => {
  const formText = getFormText(input, options, props)
  // console.log('meta ', meta)
  // const fieldAttrs = getFieldAttrs(input, meta, options)
  let fromSelector = {}
  if (searchPath) {
    const dispatch = useDispatch()
    const [term, setTerm] = useState('')
    const [subscription, setSubscription] = useState(undefined)
    const args = (term) => ({
      url: searchPath,
      params: {term: decodeURIComponent(term),
        page_size: 1000000},
    })
    const getSelector = (term) => searchObjects.select(args(term))
    const onSearch = (term) => {
      if (typeof(term) == 'string' && term.length == 2) {
        const subscription = dispatch(searchObjects.initiate(args(term)))
        setTerm(term)
        setSubscription(subscription)
      }
    }
    const {isLoading: busy, data} = useSelector(getSelector(term))
    const onBlur = () => subscription && subscription.unsubscribe()
    fromSelector = {
      data,
      busy,
      onSearch,
      onBlur,
    }
  }
  const WidgetComponent = props.listbox ? Listbox : DropdownList
  return <>
    <WidgetComponent
      {...input}
      {...getFieldAttrs(input, meta, options)}
      filter='contains'
      messages={widgetMessages(notFound)}
      {...props}
      {...fromSelector}
    />
    <WidgetErrors {...meta} />
    {formText && <FormTextList {...{formText}} />}
  </>
}

DropdownListComp.propTypes = {
  input: PropTypes.object,
  options: PropTypes.object,
  meta: PropTypes.object,
  search_path: PropTypes.string,
  listbox: PropTypes.bool,
  not_found: PropTypes.string,
  props: PropTypes.string,
}

export default DropdownListComp


// const DropdownListComp = ({
//   input,
//   options,
//   // input: {
//   //   name: inputName,
//   //   ...input
//   // } = {},
//   // name = inputName,
//   // id = name,
//   // options: {
//   //   [name]: fieldProps = {},
//   // } = {},
//   // label: placeholder = fieldProps.label,
//   // required = fieldProps.required,
//   // readOnly = fieldProps.read_only,
//   // formText = fieldProps.help_text,
//   meta,
//   search_path: searchPath,
//   ...props
// }) => {
//   const formText = getFormText(input, options, props)
//   // const fieldAttrs = getFieldAttrs(input, meta, options)
//   let fromSelector = {}
//   if (searchPath) {
//     const dispatch = useDispatch()
//     const [term, setTerm] = useState('')
//     const [subscription, setSubscription] = useState(undefined)
//     const args = (term) => ({url: searchPath,
//       params: {term: decodeURIComponent(term),
//         page_size: 1000000},
//     })
//     const getSelector = (term) =>
//       apiSlice.endpoints.searchObjects.select(args(term))
//     const onSearch = (term) => {
//       if (typeof(term) == 'string' && term.length == 2) {
//         const subscription =
//             dispatch(apiSlice.endpoints.searchObjects.initiate(args(term)))
//         setTerm(term)
//         setSubscription(subscription)
//       }
//     }
//     // console.log('test1 ', useSelector(getSelector(term)))
//     const {isLoading: busy, data} = useSelector(getSelector(term))
//     const onBlur = () => subscription.unsubscribe()
//     fromSelector = {
//       data,
//       busy,
//       onSearch,
//       onBlur,
//     }
//   }
//   const WidgetComponent = props.listbox ? Listbox : DropdownList
//   return <>
//     <WidgetComponent
//       {...input}
//       {...getFieldAttrs(input, meta, options)}
//       // {...{name,
//       //   id,
//       //   placeholder,
//       //   required,
//       //   readOnly,
//       // }}
//       filter='contains'
//       // invalid={invalid(meta)}
//       // valid={valid(meta)}
//       messages={WidgetMessages}
//       {...props}
//       {...fromSelector}
//     />
//     <WidgetErrors {...meta} />
//     {formText && <FormTextList {...{formText}} />}
//   </>
// }
