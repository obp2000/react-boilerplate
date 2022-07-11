import PropTypes from 'prop-types'
import React from 'react'
import {Outlet} from 'react-router-dom'
import NavBar from './NavBar/NavBar'

const Layout = (props) => {
  // console.log('layout props ', props)
  return <>
    <NavBar {...props} />
    <Outlet context={props}/>
  </>
}

Layout.propTypes = {
  props: PropTypes.object
}

export default Layout
