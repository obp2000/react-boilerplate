import type { Dispatch, SetStateAction, SyntheticEvent } from 'react'

export function onSearch(
  searchPath: string | undefined,
  setData: Dispatch<SetStateAction<never[]>>,
  setBusy: Dispatch<SetStateAction<boolean>>,
) {
  return (_event: SyntheticEvent, term: string) => {
    if (typeof term === 'string' && term.length === 2) {
      setBusy(true)
      const searchParams = new URLSearchParams()
      searchParams.set('term', term)
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${searchPath}?${searchParams}`)
        .then(res => res.json()
          .then((results) => {
            // console.log('results ', results)
            setData(results)
            setBusy(false)
          }))
    }
  }
}

// function onSearch(
//   searchPath: string | undefined,
//   setData: Dispatch<SetStateAction<never[]>>,
//   setBusy: Dispatch<SetStateAction<boolean>>
// ) {
//   return (term: string) => {
//     if (typeof term === 'string' && term.length === 2) {
//       setBusy(true)
//       const searchParams = new URLSearchParams()
//       searchParams.set('term', term)
//       return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${searchPath}?${searchParams}`)
//         .then(res => res.json()
//           .then((results) => {
//             // console.log('results ', results)
//             setData(results)
//             setBusy(false)
//           }))
//     }
//   }
// }



// export function useFieldProps({
//   input,
//   name,
//   meta,
//   searchPath,
//   renderValueComponent: RenderValueComponent,
//   label,
//   labels,
//   ...props
// }: DropdownFieldRenderProps): Omit<DropdownFieldRenderProps, 'input' | 'meta'> {
//   const renderValue = ({ item }: { item: TDataItem }) =>
//     <RenderValueComponent object={item} {...{ labels }} />
//   const [data, setData] = useState([])
//   const [busy, setBusy] = useState(false)
//   let result = {
//     ...input,
//     id: name,
//     placeholder: label,
//     'aria-label': label,
//     filter: 'contains',
//     renderValue,
//     renderListItem: renderValue,
//     onSearch: onSearch(searchPath, setData, setBusy),
//     data,
//     busy,
//     ...props
//   }
//   return result
// }
