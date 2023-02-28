// import { InputFieldRenderProps } from '@/interfaces/formInput'

import { FieldErrors } from "react-hook-form/dist/types";

export default function WidgetErrors({
  message
}: FieldErrors) {
  return <p className="mt-2 text-sm text-red-600 dark:text-red-500">
    {String(message)}
  </p>
}
