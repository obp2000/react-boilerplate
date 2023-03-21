import type { Dispatch, SetStateAction, SyntheticEvent, ChangeEvent } from 'react'
import type { City } from '@/interfaces/cities'
import type { Customer } from '@/interfaces/customers'
import type { Product } from '@/interfaces/products'

export function onSearch(
  searchPath: string | undefined,
  setData: Dispatch<SetStateAction<Product[]>>,
  setBusy: Dispatch<SetStateAction<boolean>>,
): (_event: SyntheticEvent, term: string) => Promise<void | Response> | undefined
export function onSearch(
  searchPath: string | undefined,
  setData: Dispatch<SetStateAction<City[]>>,
  setBusy: Dispatch<SetStateAction<boolean>>,
): (_event: SyntheticEvent, term: string) => Promise<void | Response> | undefined
export function onSearch(
  searchPath: string | undefined,
  setData: Dispatch<SetStateAction<Customer[]>>,
  setBusy: Dispatch<SetStateAction<boolean>>,
): (_event: SyntheticEvent, term: string) => Promise<void | Response> | undefined
export function onSearch(
  searchPath: string | undefined,
  setData: Dispatch<SetStateAction<any>>,
  setBusy: Dispatch<SetStateAction<boolean>>,
): (_event: SyntheticEvent, term: string) => Promise<void | Response> | undefined {
  return (_event: SyntheticEvent, term: string) => {
    if (typeof term === 'string' && term.length === 2) {
      setBusy(true)
      const searchParams = new URLSearchParams()
      searchParams.set('term', term)
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${searchPath}?${searchParams}`)
        .then(res => res.json()
          .then((results) => {
            // console.log('results.includes(initData) ', results.map(({ id }) => id).includes(initData.id))
            // results.
            setData(results)
            setBusy(false)
          }))
    }
  }
}

export function filesHandler({
  setPreviewUrl,
  onChange
}: {
  setPreviewUrl: Dispatch<SetStateAction<string | null>>
  onChange: (...event: File[]) => void
}) {
  return (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target
    if (!fileInput.files) {
      alert("No file was chosen")
      return
    }
    const file = fileInput.files[0]
    setPreviewUrl(URL.createObjectURL(file))
    /** Reset file input */
    e.currentTarget.type = "text"
    e.currentTarget.type = "file"
    onChange(file)
  }
}
