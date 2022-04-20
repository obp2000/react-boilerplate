import config from '../Config'

const pages = 'pages/'

const RemovePage = pathname => pathname.replace(/\d+$/gi, '')

export const BasePathname = pathname =>
    RemovePage(pathname).replace(pages, '')

export const BasePagesPathname = (pathname, page) => page ?
    RemovePage(pathname) : `${pathname}${pages}`

// export const TableName1 = pathname => pathname.replace(/(\/|pages|\d+$)/gi, '')

export const TableName = location => location.pathname.split('/')[1] || config.BaseTable

// BasePathname(pathname).replace(/\//gi, '')


