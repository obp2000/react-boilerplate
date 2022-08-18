import PropTypes from 'prop-types'
import React from 'react'
import {NavbarBrand, Badge} from 'reactstrap'
import {useNavbarBrand} from './hooks'

const NavbarBrandComp = (props) => {
  const {brandText} = useNavbarBrand(props)
  return <NavbarBrand href="/">
		    <h3>
			    <Badge pill size='lg'>
			    	{brandText}
			    </Badge>
    </h3>
  </NavbarBrand>
}

NavbarBrandComp.propTypes = {
  props: PropTypes.object,
}

export default NavbarBrandComp
