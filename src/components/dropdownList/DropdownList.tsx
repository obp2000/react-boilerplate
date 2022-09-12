import DropdownList from 'react-widgets/DropdownList'
import FormTextList from '../Shared/FormTextList'
import {useDropdownList} from './hooks'
import type {DropdownListProps} from './hooks'

const DropdownListComp = (props: DropdownListProps) => {
  const {helpText, ...DropdownListProps} = useDropdownList(props)
  return <>
    <DropdownList filter='contains' {...DropdownListProps} />
    <FormTextList formText={helpText} />
  </>
}

export default DropdownListComp
