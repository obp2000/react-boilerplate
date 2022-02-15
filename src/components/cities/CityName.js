const CityName = ({
    pindex,
    city
}) => {
    let city_name = []
    if (pindex) {
        city_name.push(`инд.${pindex}`)
    }
    if (city) {
        city_name.push(`г.${city}`)
    }
    return city_name.join(' ')
}

export default CityName