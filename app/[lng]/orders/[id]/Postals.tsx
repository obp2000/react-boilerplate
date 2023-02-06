import Button from '@/client/Button'
import FloatingFormGroup from '@/formInput/FloatingFormGroup'
import Input from '@/formInput/Input'
import SelectFloatingFormGroup from '@/selectField/SelectFloatingFormGroup'
import { Field, useForm, useFormState } from 'react-final-form'
// import { BsPlus } from 'react-icons/bs'
import { BiPlus, BiMinus } from 'react-icons/bi'
import { TbEqual } from 'react-icons/tb'
import { BsFillCalculatorFill } from 'react-icons/bs'
import Tooltip from '@/client/Tooltip'
import { Translation } from '@/app/i18n/dictionaries'

export default function Postals({
  count,
  labels,
  busy
}: {
  count: string,
  labels: Translation['order']
  busy: boolean
}) {
  const { mutators } = useForm()
  const { values: { customer, total_weight } } = useFormState()
  return <tr className="border-b border-gray-200 hover:bg-gray-100">
    <td />
    <td className='text-sm'>
      <div className='grid gap-1 mb-6 md:grid-cols-7 pt-4' >
        <Field name="post_cost"
          label={labels.post_cost}
          type="number"
          step={1}
          component={FloatingFormGroup}
          disabled={busy}
        />
        <div className='pt-3 pl-2'>
          <BiPlus size={22} />
        </div>
        <SelectFloatingFormGroup name="packet"
          label={labels.packet}
          dataKey='value'
          textField='display_name'
          choices={labels.packetChoices}
          disabled={busy}
        />
        <div className='pt-3 pl-2'>
          <TbEqual size={22} />
        </div>
        <Field name="post_cost_with_packet"
          label={labels.post_cost_with_packet}
          type="number"
          disabled
          component={FloatingFormGroup}
          className='w-30'
        />
        <div className='pt-3 pl-2'>
          <BiMinus size={22} />
        </div>
        <Field name="post_discount"
          label={labels.post_discount}
          type="number"
          disabled
          component={FloatingFormGroup}
        />
      </div>
    </td>
    <td />
    <td>
      {(customer?.city?.pindex && total_weight) && <Tooltip content={count} >
        <BsFillCalculatorFill
          size={20}
          aria-labelledby={count}
          onClick={() => busy ? null : mutators.postCostCount()}
          cursor='pointer' />
      </Tooltip>}
    </td>
    <td>
      <Field name="total_postals"
        label={labels.total_postals}
        type="number"
        disabled
        component={Input}
        className='text-right w-20'
      />
    </td>
    <td>
      <Field name="packet_weight"
        type="number"
        disabled
        component={Input}
        className='text-right w-20'
      />
    </td>
    <td />
  </tr>
}


      // <Button
      //   name='post_cost_button'
      //   size='sm'
      //   onClick={() => mutators.postCostCount()}
      //   disabled={!values?.customer?.city?.pindex || !values?.total_weight} >
      //   {count}
      // </Button>