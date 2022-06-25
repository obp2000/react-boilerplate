import confirmAction from './ConfirmAction'
import { toastSuccess, toastError } from './Toast'

export const deleteWithConfirm = (action, args, commonConsts) => {
    return confirmAction(() => action(args).unwrap()
        .then(() => toastSuccess(commonConsts?.successfully))
        .catch(({data}) => toastError(data?.detail)),
        `${commonConsts?.delete}?`,
        commonConsts?.yes,
        commonConsts?.no)
}