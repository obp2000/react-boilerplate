import config from '../Config'

export const tableName = (location) =>
  location.pathname.split('/')[1] || config.BaseTable
