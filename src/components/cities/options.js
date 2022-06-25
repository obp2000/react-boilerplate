export const cityLabels = ({pindex, city} = {}) => ({
  pindex_label: `${pindex?.label.substring(0, 3).toLowerCase()}.`,
  // city_label: `${city?.label.substring(0, 1).toLowerCase()}.`,
  city_label: '',
})
