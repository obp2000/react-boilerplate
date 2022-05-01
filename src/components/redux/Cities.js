// import { createSelector } from '@reduxjs/toolkit'

// export const selectShortLabels = selectCityProps =>
//     createSelector([selectCityProps],
//         cityProps => ({
//             pindex_label: `${cityProps?.pindex?.label.substring(0, 3).toLowerCase()}.`,
//             city_label: `${cityProps?.city?.label.substring(0, 1).toLowerCase()}.`
//         })
//     )

export const cityLabels = (cityProps) => ({
  pindex_label: `${cityProps?.pindex?.label.substring(0, 3).toLowerCase()}.`,
  city_label: `${cityProps?.city?.label.substring(0, 1).toLowerCase()}.`,
});
