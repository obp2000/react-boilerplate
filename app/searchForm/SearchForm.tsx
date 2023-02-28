'use client'

import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import { alpha, styled } from '@mui/material/styles'
import { useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import {
  Controller, FormProvider, useForm
} from "react-hook-form"
import { useOnSubmit } from './hooks'

export type Term = { term: string }

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

export default function SearchForm({ searchLabel }: { searchLabel: string }) {
  const [isPending, startTransition] = useTransition()
  const onSubmit = useOnSubmit({ startTransition })
  const methods = useForm<Term>({
    defaultValues: { term: useSearchParams().get('term') || '' },
  })
  const { control, handleSubmit, formState } = methods
  const { isLoading, isValidating, isSubmitting, isDirty, isValid, dirtyFields, touchedFields } = formState || {}
  const busy = isValidating || isSubmitting || isPending
  return <FormProvider {...{ ...methods, errorMessages: {} }}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <Controller name="term"
          control={control}
          render={({ field }) => <StyledInputBase {...field}
            placeholder={`${searchLabel}...`}
            inputProps={{ 'aria-label': searchLabel, disabled: busy }}
          />}
        />
      </Search>
    </form>
  </FormProvider>
}


      // {/*        <label htmlFor="term" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
      //     {searchLabel}
      //   </label>
      //   <div className="relative">
      //     <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      //       <SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      //     </div>
      //     <Input name='term'
      //       type="search"
      //       placeholder={`${searchLabel}...`}
      //       className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      //       required
      //       disabled={busy}
      //       // component={Input}
      //     />
      //     <SearchButton {...{ searchLabel }} />
      //   </div>*/}
