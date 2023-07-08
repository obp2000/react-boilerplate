'use client'

import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import { useCallback, useTransition } from 'react'
import { useForm } from "react-hook-form"

import SearchButton from './SearchButton'

export default function SearchForm({
  lng,
  searchLabel,
}: {
  lng: string
  searchLabel: string
}) {
  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting
    }
  } = useForm<{ term: string }>({
    defaultValues: { term: useSearchParams()?.get('term') ?? '' },
  })
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const table = pathname?.split('/')[2] || 'customers'
  const { push } = useRouter()
  const onSubmit = useCallback(({ term }: { term?: string }) => {
    let url = `/${lng}/${table}`
    // console.log('term ', term)
    if (term && term?.length > 0) {
      url += `?${new URLSearchParams({ term })}`
    }
    push(url)
  }, [lng, push, table])
  const onSubmitButtonClick = useCallback(() => {
    handleSubmit(onSubmit)()
  }, [handleSubmit, onSubmit])
  const busy = isSubmitting || isPending
  return <form onSubmit={() => startTransition(onSubmitButtonClick)} className='mt-1'>
    <div className="flex justify-center">
      <div className="mb-3 xl:w-96">
        <div className="flex relative items-stretch">
          <input {...register('term')}
            type='search'
            aria-label={searchLabel}
            disabled={busy}
            placeholder={`${searchLabel}...`}
            className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          <SearchButton />
        </div>
      </div>
    </div>
  </form>
}
