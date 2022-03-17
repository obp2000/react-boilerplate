const CityName = (city_obj, {
    pindex: {
        label: pindex_label = ''
    } = {},
    city: {
        label: city_label = ''
    } = {}
} = {}) => {
    const {
        pindex = null,
        city = null
    } = city_obj || {}
    let city_name = []
    if (pindex) {
        city_name.push(
            `${pindex_label.substring(0, 3).toLowerCase()}.${pindex}`
        )
    }
    if (city) {
        city_name.push(
            `${city_label.substring(0, 1).toLowerCase()}.${city}`
        )
    }
    return city_name.join(' ')
}

export default CityName