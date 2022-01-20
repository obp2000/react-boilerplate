import React from 'react'
import { connect } from 'react-redux'
import Template from '../CityField'
import { onChangeCity } from '../../redux/Cities'
import { mapCollectionStateToProps } from '../../redux/mappers'

export default connect(mapCollectionStateToProps('cities'), {
    onChangeCity
})(Template)