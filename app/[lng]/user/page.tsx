import type { Translation } from '@/app/i18n/dictionaries'
import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import Card from '@/client/Card'
import type { User } from '@prisma/client'
import { ParsedUrlQuery } from 'querystring'
import userFieldNames from './config.json'
import { getUser } from './server'

export default async function Page({ params }: { params: ParsedUrlQuery }) {
  const user = getUser()
  const lng = String(params.lng) || fallbackLng
  const dict = await getDictionary(lng)
  return <>
    <div className='columns-3'>
      <div className='text-center text-2xl text-gray-900'>
        {dict.users.singular}
      </div>
    </div>
    <div className="max-w-md">
      <Card>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {userFieldNames.map((fieldName, key) => <li key={key} className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  {dict.user[fieldName as keyof Translation['user']]}
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {user && user[fieldName as keyof User]}
              </div>
            </div>
          </li>)}
        </ul>
      </Card>
    </div>
  </>
}
