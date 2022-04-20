import React from "react"
import PropTypes from "prop-types"
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap'
import { confirmable, createConfirmation } from "react-confirm"

class Confirmation extends React.Component {
    render() {
        const {
            proceedLabel,
            cancelLabel,
            title,
            confirmation,
            show,
            proceed,
            enableEscape = true
        } = this.props
        return <Modal
                isOpen={show}>
                <ModalHeader>
                  {title}
                </ModalHeader>
                <ModalBody>
                  {confirmation}
                </ModalBody>
                <ModalFooter>
                  <Button
                    size='sm'
                    outline
                    onClick={() => proceed(false)}>
                    {cancelLabel}
                  </Button>
                  <Button
                    size='sm'
                    outline
                    onClick={() => proceed(true)}>
                    {proceedLabel}
                  </Button>
                </ModalFooter>
              </Modal>
    }
}

Confirmation.propTypes = {
    proceedLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    title: PropTypes.string,
    confirmation: PropTypes.string,
    show: PropTypes.bool,
    proceed: PropTypes.func, // called when ok button is clicked.
    enableEscape: PropTypes.bool
}

export default createConfirmation(confirmable(Confirmation))


// export function confirm(
//     confirmation,
//     proceedLabel = "OK",
//     cancelLabel = "cancel",
//     options = {}
// ) {
//     return createConfirmation(confirmable(Confirmation))({
//         confirmation,
//         proceedLabel,
//         cancelLabel,
//         ...options
//     })
// }