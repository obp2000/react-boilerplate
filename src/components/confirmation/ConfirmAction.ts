import confirmationComp from './Confirmation'

const ConfirmAction = (
    action: () => void,
    text = 'Delete',
    proceedLabel = 'Ok',
    cancelLabel = 'Cancel',
): () => Promise<void> => async () => {
  const confirm = (confirmation: string): Promise<string> => confirmationComp({
    confirmation,
    proceedLabel,
    cancelLabel,
  })
  if (await confirm(`${text}?`)) {
    action()
  }
}

export default ConfirmAction
