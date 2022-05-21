import React from 'react'
import {ToastContainer, Zoom} from 'react-toastify'

const ToastContainerComp = () =>
  <ToastContainer position="top-center"
    autoClose={2000}
    transition={Zoom}
    theme="colored"
    closeOnClick
    draggable
    hideProgressBar={true}
    limit={1}
    role="alert"
  />

export default ToastContainerComp
