import React from 'react'
import { connect } from 'react-redux'
import Template from '../CityField'
import { onChangeCity } from '../../redux/Cities'
import { mapCollectionStateToProps } from '../../redux/mappers'

const mapStateToProps = ({
    cities: {
        results,
        isFetching
    }}) => ({results, isFetching})

export default connect(mapStateToProps, {
    onChangeCity
})(Template)