const productName = ({
  // product_type: productType,
  get_product_type_display: getProductTypeDisplay,
  threads,
  get_threads_display: getThreadsDisplay,
  contents,
  get_contents_display: getContentsDisplay,
  fleece,
  name,
}, {
  fleeceLabel,
}) => {
  const productNameArray = []
  if (getProductTypeDisplay) productNameArray.push(getProductTypeDisplay)
  if (threads != null) productNameArray.push(getThreadsDisplay)
  if (contents != null) productNameArray.push(getContentsDisplay)
  if (fleece) productNameArray.push(fleeceLabel)
  productNameArray.push(name)
  return productNameArray.join(' ')
}

export default productName
