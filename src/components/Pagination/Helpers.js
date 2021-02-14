const addPage = (pages, page, table, search, label, className) => {
	pages.push({
		pathname: `/${table}/pages/${page}`,
		search,
		label: label.toString(),
		className
	})
}

export const pages = (table, totalPages, currentPage, search) => {
	let pages = []
	if (currentPage > 1) {
		addPage(pages, currentPage - 1, table, search, '<<')
	}
	for (let page = 1; page <= totalPages; page++) {
		addPage(pages, page, table, search, page, 'page-item' + (page == currentPage ? ' active' : ''))
	}
	if (currentPage < totalPages) {
		addPage(pages, currentPage + 1, table, search, '>>')
	}
	return pages
}