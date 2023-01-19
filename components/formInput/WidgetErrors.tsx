import type { FieldMetaState } from 'react-final-form'
import dynamic from 'next/dynamic'
import ErrorPlaceholder from './placeholders/Error'

const DynamicError = dynamic(() => import('./Error'), {
  loading: () => <ErrorPlaceholder />
})

export default function WidgetErrors({ touched, error }: FieldMetaState<any>) {
  if (touched && !!error) {
    return <p className="mt-2 text-sm text-red-600 dark:text-red-500">
        <DynamicError {...{ error }} />
      </p>
  } else {
    return null
  }
}
