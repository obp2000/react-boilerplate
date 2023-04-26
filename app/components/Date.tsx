import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

export function formatRu(dateString: string) {
  return format(parseISO(dateString), 'dd.MM.yyyy HH:mm:ss', { locale: ru })
}

export default function Date({ dateString }: { dateString?: string }) {
  if (!dateString) { return null }
  return <time dateTime={dateString}>
    {formatRu(dateString)}
  </time>
}


// formatRelative(subDays(new Date(), 3), new Date(), { locale: ru })
//=> "в прошлую пятницу в 19:26"  "%d.%m.%Y %H:%M:%S"
