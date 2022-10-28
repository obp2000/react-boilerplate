import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import { FC } from 'react'

const Date: FC<{ dateString?: string }> = ({ dateString }) => {
  if (!dateString) { return null }
  const date = parseISO(dateString)
  return <time dateTime={dateString}>
    {format(date, 'dd.MM.yyyy HH:mm:ss', { locale: ru })}
  </time>
}

export default Date


// formatRelative(subDays(new Date(), 3), new Date(), { locale: ru })
//=> "в прошлую пятницу в 19:26"  "%d.%m.%Y %H:%M:%S"
