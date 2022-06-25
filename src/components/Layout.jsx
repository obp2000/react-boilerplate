import React from 'react'
import {Outlet} from 'react-router-dom'
import NavBar from './NavBar/NavBar'

const Layout = (props) => <>
  <NavBar {...props} />
  <Outlet />
</>

export default Layout
