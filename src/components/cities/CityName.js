const CityName = (city_obj, {
    pindex_label,
    city_label
}) => {
    const {
        pindex = null,
        city = null
    } = city_obj || {}
    let city_name = []
    if (pindex) {
        city_name.push(pindex_label)
        city_name.push(pindex)
    }
    if (city) {
        city_name.push(city_label)
        city_name.push(city)
    }
    return city_name.join(' ')
}

export default CityName