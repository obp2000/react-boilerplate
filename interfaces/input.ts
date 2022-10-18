import type { FieldRenderProps } from 'react-final-form'
import type { AnyOptionsType } from './options'

export type FieldAttrs = FieldRenderProps<any> & AnyOptionsType

export type FilesHandlerEvent = { target?: { files?: FileList | null } }

export type FilesHandler = (event: FilesHandlerEvent) => void

// export type FieldAttrs1 = {
//   name: string
//   type?: InputType
//   input: FieldInputProps<any>
//   meta: FieldMetaState<any>
//   options?: AnyOptions
//   label?: string
//   helpText?: string
//   required?: boolean
//   readOnly?: boolean
// }
