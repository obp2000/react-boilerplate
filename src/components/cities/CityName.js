const cityName = (city, cityProps) => {
  const cityNameArray = []
  if (city?.pindex) {
    cityNameArray.push(cityProps?.pindex_label)
    cityNameArray.push(city.pindex)
  }
  if (city?.city) {
    cityNameArray.push(cityProps?.city_label)
    cityNameArray.push(city.city)
  }
  return cityNameArray.join(' ')
}

export default cityName
