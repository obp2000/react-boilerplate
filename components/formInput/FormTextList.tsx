import { useMapFieldProps } from '@/options/hooks'
import parse from 'html-react-parser'
import type { FieldRenderProps } from 'react-final-form'
import React from 'react'
import { DropdownProps } from 'react-widgets/cjs/DropdownList'

export default function FormTextList(props: Omit<FieldRenderProps<any>, 'input' | 'meta'> |
  DropdownProps<any>) {
  let { helpText } = useMapFieldProps(props) as { helpText: string }
  if (!helpText) { return null }
  return <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
    {parse(helpText)}
  </div>
}
