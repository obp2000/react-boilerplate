import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    Badge
} from 'reactstrap'
import NavLink from './NavLink'
import AuthModal from '../auth/AuthModal'
import AuthButton from '../auth/AuthButton'
import SearchForm from '../Search/SearchForm'
import { TableName } from '../Shared/BasePathname'
import config from '../Config'

const NavBar = () => {
    const loaded = useSelector(({
        common_consts: {
            main_menu = []
        } = {}
    }) => ({
        main_menu
    }))
    return <>
        <Navbar color="primary" expand="md" dark className="py-0 mb-1" >
            <NavbarBrand href="/">
                <h3>
                    <Badge pill size='lg'>Best&C</Badge>
                </h3>
            </NavbarBrand>
            <NavbarToggler className="me-2"
                data-bs-toggle="collapse"
                data-bs-target="#navbarContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation" />
            <Collapse navbar id="navbarContent">
                <Nav className="me-auto" navbar>
                    {loaded.main_menu.map(({path: to, label}, key) =>
                        <NavItem key={key}>
                            <NavLink {...{to, label}} />
                        </NavItem>
                    )}
                </Nav>
                <SearchForm />
            </Collapse>
        </Navbar>
        <AuthModal />
        </>
}

export default NavBar