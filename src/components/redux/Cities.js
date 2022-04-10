import { createSelector } from 'reselect'

export const selectShortLabels = selectCityProps =>
    createSelector([selectCityProps],
        ({
            pindex = {},
            city = {}
        }) => {
            const {
                label: pindex_label = ''
            } = pindex
            const {
                label: city_label = ''
            } = city
            return {
                pindex_label: `${pindex_label.substring(0, 3).toLowerCase()}.`,
                city_label: `${city_label.substring(0, 1).toLowerCase()}.`
            }
        }
    )



// export const selectPindexShortLabel = selectCityProps =>
//     createSelector([selectCityProps],
//         ({
//             pindex: {
//                 label = ''
//             } = {}
//         }) => label.substring(0, 3).toLowerCase()
//     )

// export const selectCityShortLabel = selectCityProps =>
//     createSelector([selectCityProps],
//         ({
//             city: {
//                 label = ''
//             } = {}
//         }) => label.substring(0, 1).toLowerCase()
//     )

// export const selectCityName1 = (city, selectCityProps) =>
//     createSelector([selectPindexShortLabel(selectCityProps), selectCityShortLabel(selectCityProps)],
//         (pindexShortLabel, cityShortLabel) => {
//             let city_name = []
//             if (city.pindex) {
//                 city_name.push(
//                     `${pindexShortLabel}.${city.pindex}`
//                 )
//             }
//             if (city.city) {
//                 city_name.push(
//                     `${cityShortLabel}.${city.city}`
//                 )
//             }
//             return city_name.join(' ')
//         }
//     )

// export const selectCityName = (city, selectCityProps) =>
//     createSelector([selectCityProps],
//         ({
//             pindex: {
//                 label: pindex_label = ''
//             } = {},
//             city: {
//                 label: city_label = ''
//             } = {}
//         }) => {
//             let city_name = []
//             if (city.pindex) {
//                 city_name.push(
//                     `${pindex_label.substring(0, 3).toLowerCase()}.${city.pindex}`
//                 )
//             }
//             if (city.city) {
//                 city_name.push(
//                     `${city_label.substring(0, 1).toLowerCase()}.${city.city}`
//                 )
//             }
//             return city_name.join(' ')
//         }
//     )