import { OrderItemSelect } from '@/interfaces/api'
import { Prisma } from '@prisma/client'
// import { Decimal } from '@prisma/client/runtime'
import { TFunction } from 'i18next'
import { FieldArrayRenderProps } from 'react-final-form-arrays'
import initOrderItem from './initOrderItem.json'

type InitOrderItem = Omit<typeof initOrderItem, 'amount'> & { amount: Prisma.Decimal }

export function useOnClickDeleteButton({
  index,
  fields,
  t
}: Omit<FieldArrayRenderProps<Omit<OrderItemSelect, 'id' | 'created_at' | 'updated_at'>, HTMLElement>, 'meta'> &
  { index: number, t: TFunction }) {
  return async () => {
    const confirm = (await import('@/confirmation/Confirmation')).confirm
    const result = await confirm(`${t('delete')}?`,
      { okText: t('yes'), cancelText: t('no') })
    if (result) {
      fields.update(index, initOrderItem as unknown as InitOrderItem)
      fields.remove(index)
    }
  }
}


// export function useDeleteButton({
//   index,
//   lng
// }: { index: number, lng: string }) {
//   const { t } = useTranslation(lng)
//   const { fields } = useFieldArray('orderItems')
//   const label = t('delete')
//   const onClick = async () => {
//     const confirm = (await import('@/confirmation/Confirmation')).confirm
//     const result = await confirm(`${label}?`,
//       { okText: t('yes'), cancelText: t('no') })
//     if (result) {
//       fields.update(index, initOrderItem)
//       fields.remove(index)
//     }
//   }
//   return {
//     size: 'sm',
//     'aria-labelledby': label,
//     onClick,
//     children: label,
//   }
// }




// export function useAddButton({
//   fields,
//   lng
// }: Omit<FieldArrayRenderProps<Omit<OrderItemSelect, 'id'>, HTMLElement>, 'meta'> &
//   { lng: string }) {
//   const { t } = useTranslation(lng)
//   // const { fields } = useFieldArray('orderItems')
//   const onClick = () => fields.push(initOrderItem)
//   const label = t('add')
//   return {
//     size: 'sm',
//     'aria-labelledby': label,
//     onClick,
//     children: label,
//   }
// }