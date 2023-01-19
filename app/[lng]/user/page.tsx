import { useTranslation } from '@/app/i18n'
import { fallbackLng } from '@/app/i18n/settings'
import Card from '@/client/Card'
import { ParsedUrlQuery } from 'querystring'
import userFieldNames from './config.json'
import Header from './Header'
import options from './options.json'
import { getUser } from './server'
import type { User } from '@prisma/client'

export default async function Page({
  params
}: { params: ParsedUrlQuery }) {
  const lng = String(params.lng) || fallbackLng
  const { t } = await useTranslation(lng)
  const user = getUser()
  return <>
    <Header label={t('user')} />
    <Card>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {userFieldNames.map((fieldName, key) =>  <li key={key} className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  {options && options[fieldName as keyof
                    Omit<typeof options, 'name_singular'>].label}
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {user && user[fieldName as keyof User]}
              </div>
            </div>
          </li>)}
      </ul>
    </Card>
  </>
}
