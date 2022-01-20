import { connect } from 'react-redux'
import Template from '../CustomerField'
import { onSearchCustomer } from '../../redux/Customers'
import { mapCollectionStateToProps } from '../../redux/mappers'

export default connect(mapCollectionStateToProps('customers'), {
    onSearchCustomer
})(Template)