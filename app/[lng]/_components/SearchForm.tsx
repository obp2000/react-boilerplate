'use client'

import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import { useCallback, useTransition } from 'react'
import { Controller, useForm } from "react-hook-form"
import SearchButton from './SearchButton'

export default function SearchForm({
  lng,
  searchLabel,
}: {
  lng: string
  searchLabel: string
}) {
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const table = pathname?.split('/')[2] || 'customers'
  // console.log('segm in search form ', useSelectedLayoutSegment(),
  //   useSelectedLayoutSegments())
  const { push } = useRouter()
  const onSubmit = useCallback(({ term }: { term?: string }) => {
    startTransition(() => {
      let url = `/${lng}/${table}`
      // console.log('term ', term)
      if (term && term?.length > 0) {
        url += `?${new URLSearchParams({ term })}`
      }
      push(url)
    })
  }, [lng, push, table])
  const {
    control,
    handleSubmit,
    formState: {
      isSubmitting
    }
  } = useForm<{ term: string }>({
    defaultValues: { term: useSearchParams()?.get('term') ?? '' },
  })
  const busy = isSubmitting || isPending
  const onSubmitButtonClick = useCallback(() => {
    handleSubmit(onSubmit)()
  }, [handleSubmit, onSubmit])

  return <form onSubmit={onSubmitButtonClick} className='mt-1'>
    <div className="flex justify-center">
      <div className="mb-3 xl:w-96">
        <div className="flex relative items-stretch">
          <Controller name="term"
            control={control}
            render={({ field }) => <input {...field}
              type='search'
              aria-label={searchLabel}
              disabled={busy}
              placeholder={`${searchLabel}...`}
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />}
          />
          <SearchButton />
        </div>
      </div>
    </div>
  </form>
}


// {/*    <Search>
//       <SearchIconWrapper>
//         <SearchIcon />
//       </SearchIconWrapper>
//       <Controller name="term"
//         control={control}
//         render={({ field }) => <StyledInputBase {...field}
//           placeholder={`${searchLabel}...`}
//           inputProps={{ 'aria-label': searchLabel, disabled: busy }}
//         />}
//       />
//     </Search>*/}

// export const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       width: '12ch',
//       '&:focus': {
//         width: '20ch',
//       },
//     },
//   },
// }))

// export const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }))
