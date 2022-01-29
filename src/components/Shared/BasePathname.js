const pages = 'pages/'

const RemovePage = pathname => pathname.replace(/\d+$/gi, '')

export const BasePathname = pathname =>
    RemovePage(pathname).replace(pages, '')

export const BasePagesPathname = (pathname, page) => page ?
    RemovePage(pathname) : `${pathname}${pages}`

export const TableName = pathname => pathname.replace(/(\/|pages|\d+$)/gi, '')

// BasePathname(pathname).replace(/\//gi, '')


