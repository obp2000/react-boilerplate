import PropTypes from 'prop-types'
import React from 'react'
import {Routes, Route, Outlet} from 'react-router-dom'
import NavBar from './NavBar/NavBar'
import NavBarLayout from './NavBarLayout'

const Layout = (props) => {
  // console.log('layout props ', props)
  return <>
    <NavBar {...props} />
    {/* <React.StrictMode>*/}
    {/*        <Routes>
            <Route element={<NavBarLayout {...props}/>}>
              <Route path='*' element={<NavBar />} />
            </Route>
        </Routes>*/}
    <Outlet />
    {/* </React.StrictMode>*/}
  </>
}

Layout.propTypes = {
  props: PropTypes.object,
}

export default Layout
