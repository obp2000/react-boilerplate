import Label from '@/inputLabel/Label'
import type { InputFieldRenderProps } from '@/interfaces/formInput'
import type { ChangeEvent } from 'react'
import { useFormContext } from "react-hook-form"
import FormTextList from './FormTextList'

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

// export default function FileFloatingFormGroup({
//   helpText,
//   name,
//   label,
//   setPreviewUrl,
//   ...props
// }: InputFieldRenderProps) {
//   const { register } = useFormContext()
//   return <>
//     <div className="relative">
//       <input id={name}
//         placeholder={label}
//         {...register(String(name))}
//         type='file'
//         accept='.jpg, .png, .jpeg'
//         onChange={filesHandler({ setPreviewUrl })}
//         className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//         {...props}
//       />
// {/*      <Label {...props}
//         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
//       />*/}
//     </div>
//     <FormTextList {...{ helpText }} />
//   </>
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
//     onChange: filesHandler({ setPreviewUrl }),
//     accept: '.jpg, .png, .jpeg',
//     ...props,
//   }
// }