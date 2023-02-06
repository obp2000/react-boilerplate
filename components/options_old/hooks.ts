import { AnyFieldRenderProps } from '@/inputLabel/Label'
// import { mapChoices } from '@/selectField/hooks'
import { FieldRenderProps } from 'react-final-form'
// import { useOptions } from './context'

// const mapFieldType = (type: string = ''): string | undefined => {
//   switch (type) {
//     case 'integer':
//     case 'decimal':
//       return 'number'
//     case 'image upload':
//       return 'file'
//     case 'boolean':
//       return 'checkbox'
//   }
// }

const emptyObject = {}

// export const useMapFieldProps = ({
//   input,
//   name = input?.name,
//   isLabel,
//   dataKey,
//   textField,
// }: Partial<FieldRenderProps<AnyFieldRenderProps>>):
//   Omit<FieldRenderProps<AnyFieldRenderProps>, 'input' | 'meta'> => {
//   const { options = emptyObject } = useOptions()
//   const {
//     type,
//     required,
//     read_only: readOnly,
//     label,
//     min_value: min,
//     max_value: max,
//     children,
//     choices,
//     help_text: helpText,
//   } = options[name.split('.').pop() as keyof AnyOptions] ??
//     emptyObject as Omit<FieldRenderProps<AnyFieldRenderProps>, 'input' | 'meta'>
//   if (isLabel) {
//     return {
//       required,
//       label,
//       htmlFor: name,
//     }
//   }
//   const result: Omit<FieldRenderProps<AnyFieldRenderProps>, 'input' | 'meta'> = {
//     type: mapFieldType(type),
//     id: name,
//     required,
//     readOnly,
//     placeholder: label,
//     'aria-label': label,
//     min,
//     max,
//     helpText,
//   }
//   if (choices) {
//     result.selectOptions = mapChoices({ dataKey, textField, choices })
//   }
//   // if (children) {
//   //   result.nestedOptions = children
//   // }
//   return result
// }


// const emptyObject = {}

// export const useOptionsTrigger = (url, optionsTrigger) => {
//     const router = useRouter()
//     const {isFallback} = router
//     useEffect(() => {
//         if (!isFallback) {
//             optionsTrigger(url, true)
//         }
//     }, [url, isFallback])
// }

// export const useOptions = (url) => getOptions.useQueryState(url, {
//     selectFromResult: ({
//         data: {
//             commonConsts,
//             options
//         } = emptyObject,
//         isLoading: isLoadingOptions,
//         isFetching: isFetchingOptions,
//         currentData: currentOptions,
//     }) => ({
//         commonConsts,
//         options,
//         isLoadingOptions,
//         isFetchingOptions,
//         currentOptions,
//     })
// })

// import { useGetOptionsQuery } from './apiSlice'

// export const useOptionsOuery = (url: string) => {
//   // const { isFallback } = useRouter()
//   return useGetOptionsQuery(url, {
//     // skip: isFallback,
//     selectFromResult: ({
//       data,
//       isLoading,
//       isFetching,
//     }): OptionsOueryResult => ({
//       commonConsts: data?.commonConsts,
//       options: data?.options,
//       // isLoadingOptions: isLoading || isFallback,
//       // isFetchingOptions: isFetching || isFallback,
//       isLoadingOptions: isLoading,
//       isFetchingOptions: isFetching,
//     }),
//   })
// }
