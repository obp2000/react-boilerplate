import { Translation } from '@/app/i18n/dictionaries'
import FloatingFormGroup from '@/formInput/FloatingFormGroup'
import Input from '@/formInput/Input'
import { ConditionGte } from '@/objectForm/FormConditions'
// import { Field } from 'react-final-form'
import consts from './consts.json'
import TextField from '@mui/material/TextField'
import { Controller } from "react-hook-form"
import InputAdornment from '@mui/material/InputAdornment'

export function Gift({
  labels,
  busy,
  control,
  units,
}: {
  labels: Translation['order']
  busy: boolean
  units: Translation['units']
}) {
  return <tr className="border-b border-gray-200 hover:bg-gray-100">
    <td />
    <td>
      <Controller name="gift"
            control={control}
            render={({ field }) => <TextField {...field}
              id="gift"
              label={labels.gift}
              variant="outlined"
              size="small"
              disabled={busy}
            />}
      />
    </td>
    <td colSpan={3} />
    <td>
      <TextField
        id="gift_weight"
        label={labels.gift_weight}
        fullWidth
        variant="outlined"
        size="small"
        disabled
        value={consts.GIFT_WEIGHT}
        InputProps={{
          endAdornment: <InputAdornment position="end">{units.gram_short}</InputAdornment>,
        }}
      />
    </td>
  </tr>
}

// export default function GiftIfNeeded({
//   labels,
//   busy,
// }: {
//   labels: Translation['order']
//   busy: boolean
// }) {
//   return <ConditionGte
//     when="order_items_cost"
//     gte={consts.SUM_FOR_GIFT}>
//     <Gift {...{ labels, busy }} />
//   </ConditionGte>
// }


// {/*      <Field name="gift"
//         label={labels.gift}
//         component={FloatingFormGroup}
//         disabled={busy}
//       />*/}

// {/*      <Field name="gift_weight"
//         type="number"
//         disabled
//         component={Input}
//         className='text-right w-20'
//       />*/}
