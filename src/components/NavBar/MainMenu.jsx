import PropTypes from 'prop-types'
import React from 'react'
import Link from 'next/link'
// import {useRouter} from "next/dist/client/router"
import {NavItem} from 'reactstrap'
import {useMainMenu} from './hooks'

const MainMenu = (props) => {
  const mainMenu = useMainMenu(props)
  return mainMenu?.map(({path, className, label}, key) =>
    <NavItem key={key}>
		   	<Link href={path} shallow={true}>
        <a {...{className}}>
          {label}
        </a>
		   	</Link>
    </NavItem>)
}

MainMenu.propTypes = {
  props: PropTypes.object,
}

export default MainMenu
