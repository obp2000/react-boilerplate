import { useMapFieldProps } from '@/options/hooks'
import {
  useState, type ChangeEvent,
  type Dispatch,
  type SetStateAction
} from 'react'
import type {
  FieldInputProps, FieldMetaState, FieldRenderProps
} from 'react-final-form'

const invalid = ({ touched, error }: FieldMetaState<any>): boolean =>
  Boolean(touched && !!error)

const valid = ({
  dirty,
  active,
  touched,
  error,
}: FieldMetaState<any>): boolean =>
  Boolean(touched && !active && dirty && !error)

const isValidatedField = (type: string | undefined): boolean =>
  [undefined, 'text', 'number', 'password', 'email',].includes(type)

const validationProps = (meta: FieldMetaState<any>): {
  isInvalid?: boolean,
  isValid?: boolean
} => ({
  // invalid: invalid(meta),
  // valid: valid(meta),
  isInvalid: invalid(meta),
  isValid: valid(meta),
})

type FileTypeProps = {
  input: FieldInputProps<any>,
  // setFile: Dispatch<SetStateAction<File | null>>
  setPreviewUrl: Dispatch<SetStateAction<string | null>>
}

const filesHandler = ({
  input: {
    onChange
  },
  // setFile,
  setPreviewUrl
}: FileTypeProps) => (e: ChangeEvent<HTMLInputElement>) => {
  const fileInput = e.target
  if (!fileInput.files) {
    alert("No file was chosen")
    return
  }
  const file = fileInput.files[0]
  // setFile(file) // we will use the file state, to send it later to the server
  setPreviewUrl(URL.createObjectURL(file)) // we will use this to show the preview of the image
  /** Reset file input */
  e.currentTarget.type = "text"
  e.currentTarget.type = "file"
  if (file) {
    // return input?.onChange(e.target.files[0])
    onChange(file)
  }
}

// const cancelFilesHandler = (

//   ) = (e: MouseEvent<HTMLButtonElement>) => {
//   e.preventDefault()
//   if (!previewUrl && !file) {
//     return
//   }
//   setFile(null)
//   setPreviewUrl(null)
// }


const fileTypeProps = (props: FileTypeProps) => ({
  value: undefined,
  // onChange: filesHandler(input) as FormEventHandler,
  onChange: filesHandler(props),
  accept: '.jpg, .png, .jpeg',
})

type FieldProps = FieldRenderProps<any> & ReturnType<typeof validationProps> &
{ previewUrl: string }

export const useFieldProps = ({
  input,
  meta,
  ...props
}: FieldRenderProps<any>): Omit<FieldRenderProps<any>, 'input' | 'meta'> => {
  let {
    type: typeFromFieldProps,
    helpText,
    ...result
  } = useMapFieldProps({ input, ...props }) as FieldProps
  const type = input?.type ?? typeFromFieldProps
  result = { type: typeFromFieldProps, ...result, ...input }
  if (type === 'file') {
    // const [file, setFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    result = {
      ...result, previewUrl,
      ...fileTypeProps({ input, setPreviewUrl })
    } as FieldProps
  }
  if (meta && isValidatedField(type)) {
    result = { ...result, ...validationProps(meta) }
  }
  return {
    ...result,
    ...props,
  }
}
