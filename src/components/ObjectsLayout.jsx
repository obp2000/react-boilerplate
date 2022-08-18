import PropTypes from 'prop-types'
import React, {lazy} from 'react'
import {Outlet, useOutletContext} from 'react-router-dom'
import AuthModal from './auth/AuthModal'

// const AuthModal = lazy(() => import('./auth/AuthModal'))

const ObjectsLayout = (props) => {
  const layoutContext = useOutletContext()
  const context = {...layoutContext, ...props}
  return 	<>
    {!context?.isAuthenticated && <AuthModal {...context?.commonConsts} />}
    <Outlet context={context} />
  </>
}

ObjectsLayout.propTypes = {
  props: PropTypes.object,
}

export default ObjectsLayout
