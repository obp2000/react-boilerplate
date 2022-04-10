const ProductName = ({
    product_type,
    get_product_type_display,
    threads,
    get_threads_display,
    contents,
    get_contents_display,
    fleece,
    name
}, {
    fleece_label
}) => {
    let product_name = []
    if (get_product_type_display) product_name.push(get_product_type_display)
    if (threads != null) product_name.push(get_threads_display)
    if (contents != null) product_name.push(get_contents_display)
    if (fleece) product_name.push(fleece_label)
    product_name.push(name)
    return product_name.join(' ')
}

export default ProductName
