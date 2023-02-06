import { InputFieldRenderProps } from '@/interfaces/formInput'

export default function WidgetErrors({
  error
}: InputFieldRenderProps['meta']) {
  return <p className="mt-2 text-sm text-red-600 dark:text-red-500">
    {error}
  </p>
}
