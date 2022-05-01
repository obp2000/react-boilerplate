import confirmationComp from './Confirmation'

const ConfirmAction = (
    action,
    text,
    proceedLabel = 'Ok',
    cancelLabel = 'Cancel',
) => async () => {
  const confirm = (confirmation) => confirmationComp({
    confirmation,
    proceedLabel,
    cancelLabel,
  })
  if (await confirm(text)) {
    action()
  }
}

export default ConfirmAction
