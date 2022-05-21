export const cityLabels = (cityProps) => ({
  pindex_label: `${cityProps?.pindex?.label.substring(0, 3).toLowerCase()}.`,
  city_label: `${cityProps?.city?.label.substring(0, 1).toLowerCase()}.`,
})
