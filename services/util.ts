export function makeSerializable<T extends any>(o: T): T {
    return JSON.parse(JSON.stringify(o))
}

// export function replaceNulls<T extends any>(object: T): T {
//     if (object) {
//         Object.keys(object).map(
//             (key) => {
//                 if (object[key as keyof T] === null) {
//                     object[key] = ''
//                 } else if (typeof object[key as keyof T] === 'object') {
//                     replaceNulls(object[key as keyof T])
//                 }
//             }
//         )
//     }
//     return object
// }

// export const integerOrDec = '^\d*(\.\d+)?$'
