import { InputFieldRenderProps } from '@/interfaces/formInput'
import type { ChangeEvent } from 'react'

export function useFieldProps({
  input,
  meta: {
    dirty,
    active,
    touched,
    error,
  },
  label,
  setPreviewUrl,
  ...props
}: InputFieldRenderProps):
  Omit<InputFieldRenderProps, 'input' | 'meta'> {
  return {
    ...input,
    id: input.name,
    placeholder: label,
    isInvalid: touched && !!error,
    isValid: touched && !active && dirty && !error,
    ...props,
  }
}

// function filesHandler({
//   input: {
//     onChange
//   },
//   setPreviewUrl
// }: Omit<InputFieldRenderProps, 'meta'>) {
//   return (e: ChangeEvent<HTMLInputElement>) => {
//     const fileInput = e.target
//     if (!fileInput.files) {
//       alert("No file was chosen")
//       return
//     }
//     const file = fileInput.files[0]
//     setPreviewUrl(URL.createObjectURL(file))
//     /** Reset file input */
//     e.currentTarget.type = "text"
//     e.currentTarget.type = "file"
//     if (file) {
//       onChange(file)
//     }
//   }
// }

// export function useFileProps({
//   input,
//   label,
//   setPreviewUrl,
//   ...props
// }: InputFieldRenderProps):
//   Omit<InputFieldRenderProps, 'input' | 'meta'> {
//   return {
//     ...input,
//     id: input.name,
//     type: 'file',
//     value: undefined,
//     onChange: filesHandler({ input, setPreviewUrl }),
//     accept: '.jpg, .png, .jpeg',
//     ...props,
//   }
// }

export function getSwitchHandler(setChecked) {
  return ({ target }) => {
    setChecked(target.checked)
  }
}

export function filesHandler({
  setPreviewUrl
}: Omit<InputFieldRenderProps, 'meta'>) {
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
  }
}


// type FileTypeProps = {
//   input: FieldInputProps<inputFieldValue>,
//   // setFile: Dispatch<SetStateAction<File | null>>
//   setPreviewUrl: Dispatch<SetStateAction<string | null>>
// }

// const invalid = ({ touched, error }: FieldMetaState<inputFieldValue>): boolean =>
//   Boolean(touched && !!error)

// const valid = ({
//   dirty,
//   active,
//   touched,
//   error,
// }: FieldMetaState<inputFieldValue>): boolean =>
//   Boolean(touched && !active && dirty && !error)


// const validationProps = (meta: FieldMetaState<inputFieldValue>): {
//   isInvalid?: boolean,
//   isValid?: boolean
// } => ({
//   // invalid: invalid(meta),
//   // valid: valid(meta),
//   isInvalid: invalid(meta),
//   isValid: valid(meta),
// })


// const cancelFilesHandler = (

//   ) = (e: MouseEvent<HTMLButtonElement>) => {
//   e.preventDefault()
//   if (!previewUrl && !file) {
//     return
//   }
//   setFile(null)
//   setPreviewUrl(null)
// }


// const fileTypeProps = (props: FileTypeProps) => ({
//   value: undefined,
//   onChange: filesHandler(props),
//   accept: '.jpg, .png, .jpeg',
// })

// type FieldProps = FieldRenderProps<inputFieldValue> &
//   ReturnType<typeof validationProps> &
// { previewUrl: string }
