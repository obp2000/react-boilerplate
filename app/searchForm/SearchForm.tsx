'use client'

import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import { alpha, styled } from '@mui/material/styles'
import { usePathname, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import { Controller, useForm } from "react-hook-form"
import { useOnSubmit } from './hooks'

type Term = { term: string }

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

export default function SearchForm({
  searchLabel,
  lng,
}: {
  searchLabel: string
  lng: string
}) {
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const table = pathname?.split('/')[2] || 'customers'
  const searchParams = useSearchParams()
  const term = searchParams?.get('term') || ''
  const onSubmit = useOnSubmit({
    searchParams: new URLSearchParams(searchParams ?? ''),
    lng,
    table,
    startTransition
  })
  const {
    control,
    handleSubmit,
    formState: {
      isLoading,
      isSubmitting
    }
  } = useForm<Term>({
    defaultValues: { term },
  })
  const busy = isSubmitting || isPending
  return <form onSubmit={handleSubmit(onSubmit)}>
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
