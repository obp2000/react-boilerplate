import { connect } from 'react-redux'
import Template from '../CustomerField'
import { onSearch, onBlur } from '../../redux/Customers'
import { mapCollectionStateToProps } from '../../redux/mappers'

export default connect(mapCollectionStateToProps('customers'), {
    onSearch, onBlur
})(Template)