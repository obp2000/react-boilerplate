import Button from '@/client/Button'
import Modal from '@/client/Modal'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { confirmable, createConfirmation } from 'react-confirm'

type Props = {
  /** header title */
  title: string
  confirmation: string, // arguments of your confirm function
  okText: string,
  cancelText: string,
  okButtonStyle: 'primary' | 'secondary' | 'success' | 'danger' |
  'warning' | 'info' | 'light' | 'dark' | 'link'
  cancelButtonStyle: 'primary' | 'secondary' | 'success' | 'danger' |
  'warning' | 'info' | 'light' | 'dark' | 'link'
  show: boolean // from confirmable.
  proceed: Function // from confirmable.
  cancel: Function // from confirmable.
  dismiss: Function // from confirmable.
}

const Confirmation = ({
  show,
  proceed,
  confirmation,
  // title,
  okText = 'OK',
  cancelText = 'Cancel',
  // okButtonStyle = 'primary',
  // cancelButtonStyle = 'secondary',
}: Props) => {
  // const header = title ? (
  //   <Modal.Header>
  //     {title}
  //   </Modal.Header>
  // ) : undefined;
  return (
    <Modal
      size="sm"
      show={show}
      popup={true}
      onClose={() => proceed(false)}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {confirmation}
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="gray"
              onClick={() => proceed(false)}
            >
              {cancelText}
            </Button>
            <Button
              color="failure"
              onClick={() => proceed(true)}
            >
              {okText}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal >
  )
}

const confirmLow = createConfirmation(confirmable(Confirmation))

export const confirm = (message: string, options = {}) => {
  return confirmLow(Object.assign({ confirmation: message }, options))
}


// import Button from '@/client/Button'
// import type {
//   Confirmation,
//   ProceedButtonProps
// } from '@/interfaces/confirmation'
// import { FC } from 'react'
// import Modal from 'react-bootstrap/Modal'
// import {
//   confirmable,
//   createConfirmation,
//   ReactConfirmProps
// } from 'react-confirm'

// const ProceedButton: FC<ProceedButtonProps> = ({ label, onClick }) => <Button
//   size='sm'
//   variant='outline-dark'
//   aria-labelledby={label}
//   onClick={onClick}>
//   {label}
// </Button>

// const ConfirmationComp = ({
//   proceedLabel,
//   cancelLabel,
//   title,
//   confirmation,
//   show,
//   proceed,
//   // enableEscape = true,
// }: Omit<ReactConfirmProps, 'proceed'> & Confirmation) => <Modal
//   show={show} centered>
//     <Modal.Header>
//       {title}
//     </Modal.Header>
//     <Modal.Body>
//       {confirmation}
//     </Modal.Body>
//     <Modal.Footer>
//       <ProceedButton label={cancelLabel} onClick={() => proceed(false)} />
//       <ProceedButton label={proceedLabel} onClick={() => proceed(true)} />
//     </Modal.Footer>
//   </Modal>

// export default createConfirmation(confirmable(ConfirmationComp))


