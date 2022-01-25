import React from 'react'
import { connect } from 'react-redux'
import Template from '../CityField'
import { onSearch, onBlur } from '../../redux/Cities'
import { mapCollectionStateToProps } from '../../redux/mappers'

const mapStateToProps = ({
    cities: {
        search_results,
        isFetching
    }
}) => ({
    search_results,
    isFetching
})

export default connect(mapStateToProps, { onSearch, onBlur })(Template)