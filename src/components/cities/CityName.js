const CityName = (city, cityProps) => {
    let city_name = []
    if (city?.pindex) {
        city_name.push(cityProps?.pindex_label)
        city_name.push(city.pindex)
    }
    if (city?.city) {
        city_name.push(cityProps?.city_label)
        city_name.push(city.city)
    }
    return city_name.join(' ')
}

export default CityName
