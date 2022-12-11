import { confirm } from '@/confirmation/Confirmation'
import { MainContext } from '@/options/context'
import { useContext } from 'react'
import type { ButtonProps } from 'react-bootstrap'
import { useFieldArray } from 'react-final-form-arrays'
import { initOrderItem } from './config'

export function useDeleteButton({ index }: { index: number }): ButtonProps {
  const { commonConsts } = useContext(MainContext)
  const { fields } = useFieldArray('order_items')
  const onClick = async () => {
    const result = await confirm(`${commonConsts?.delete}?`,
      { okText: commonConsts?.yes, cancelText: commonConsts?.no })
    if (result) {
      fields.update(index, initOrderItem)
      fields.remove(index)
    }
  }
  return {
  	size: 'sm',
    variant: 'outline-primary',
    'aria-labelledby': commonConsts?.delete,
    onClick,
    children: commonConsts?.delete,
  }
}

export function useAddButton(): ButtonProps {
  const { commonConsts } = useContext(MainContext)
  const { fields } = useFieldArray('order_items')
  const onClick = () => fields.push(initOrderItem)
  return {
  	size: 'sm',
    variant: 'outline-primary',
    'aria-labelledby': commonConsts?.add,
    onClick,
    children: commonConsts?.add,
  }
}