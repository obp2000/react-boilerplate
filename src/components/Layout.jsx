import React from 'react'
import {Routes, Route, Outlet} from 'react-router-dom'
import NavBar from './NavBar/NavBar'

const Layout = () => <>
  <NavBar />
  <Outlet />
</>

export default Layout
