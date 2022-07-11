import PropTypes from 'prop-types'
import React from 'react'
import {Outlet, useOutletContext} from 'react-router-dom'
import {useSelector} from 'react-redux'
import AuthModal from './auth/AuthModal'
import {selectAuth} from './auth/selectors'

const ObjectsLayout = (props) => {
	const {isAuthenticated} = useSelector(selectAuth)
	const layoutContext = useOutletContext()
	return 	<>
						{!isAuthenticated && <AuthModal />}
						<Outlet context={{...layoutContext, ...props}} />
					</>
}

ObjectsLayout.propTypes = {
  props: PropTypes.object
}

export default ObjectsLayout
