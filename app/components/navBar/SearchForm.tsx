'use client'

import { fallbackLng } from '@/app/i18n/settings'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import * as styles from '@mui/material/styles'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ParsedUrlQuery } from 'querystring'
import { useCallback, useTransition } from 'react'
import { Controller, useForm } from "react-hook-form"

type Term = { term: string }

export const Search = styles.styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: styles.alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: styles.alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

export const SearchIconWrapper = styles.styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export const StyledInputBase = styles.styled(InputBase)(({ theme }) => ({
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

export default function SearchForm({
  searchLabel,
}: {
  searchLabel: string
}) {
  const [isPending, startTransition] = useTransition()
  const params = useParams()
  const lng = String(params?.lng || fallbackLng)
  const pathname = usePathname()
  const table = pathname?.split('/')[2] || 'customers'
  const { push } = useRouter()
  const onSubmit = ({ term }: ParsedUrlQuery) => {
    startTransition(() => {
      let url = `/${lng}/${table}`
      // console.log('term ', term)
      if (term && term.length > 0) {
        url += `?${new URLSearchParams({ term: String(term) })}`
      }
      push(url)
    })
  }
  const {
    control,
    handleSubmit,
    formState: {
      isSubmitting
    }
  } = useForm<Term>({
    defaultValues: { term: useSearchParams()?.get('term') ?? '' },
  })
  const busy = isSubmitting || isPending
  const submitHandler = handleSubmit(onSubmit)
  const onSubmitButtonClick = useCallback(() => {
    if (busy) {
      return
    }
    submitHandler()
  }, [submitHandler, busy])

  return <form onSubmit={onSubmitButtonClick}>
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
}
