import { useTranslation } from '@/app/i18n/client'
import { fallbackLng } from '@/app/i18n/settings'
import { usePathname } from 'next/navigation'
import { FieldMetaState } from 'react-final-form'

export default function Error({ error }: FieldMetaState<any>) {
  const pathname = usePathname()
  const lng = pathname ? pathname.split('/')[1] : fallbackLng
  const { t } = useTranslation(lng, 'errorMessages')
  return <>{t(error)}</>
}

// export function PlaceholderError() {
//   return <p className="mt-2 text-sm text-red-600 dark:text-red-500">
//     Error...
//   </p>
// }