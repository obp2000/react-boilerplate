import PropTypes from 'prop-types'
import React, {lazy} from 'react'
import {Outlet, useOutletContext} from 'react-router-dom'
// import AuthModal from './auth/AuthModal'

const AuthModal = lazy(() => import('./auth/AuthModal'))

const ObjectsLayout = (props) => {
	const layoutContext = useOutletContext()
	const context = {...layoutContext, ...props}
	// console.log('props ', props)
	// console.log('layoutContext ', layoutContext)
	return 	<>
						{!context?.isAuthenticated && <AuthModal />}
						<Outlet context={context} />
					</>
}

ObjectsLayout.propTypes = {
  props: PropTypes.object
}

export default ObjectsLayout
