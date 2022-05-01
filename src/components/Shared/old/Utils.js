export const renameKey = (obj, oldKey, newKey) => {
  if (typeof (obj[oldKey]) !== 'undefined') {
    obj[newKey] = obj[oldKey]
    delete obj[oldKey]
  }
}
