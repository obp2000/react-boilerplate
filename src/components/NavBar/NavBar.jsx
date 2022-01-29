import PropTypes from 'prop-types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    Badge
} from 'reactstrap'
import NavItemWithLink from './NavItemWithLink'
import AuthModal from '../auth/AuthModal'
import AuthButton from '../auth/AuthButton'
import SearchForm from '../Search/SearchForm'
import { TableName } from '../Shared/BasePathname'
// import Errors from '../Errors'

const NavBar = props => {
    const {
        location: {
            pathname
        }
    } = props
    const loaded = useSelector(({
        auth: {
            isAuthenticated
        }
    }) => ({
        isAuthenticated,
    }))
    const table = TableName(pathname)
    const dispatch = useDispatch()
    return <>
        <Navbar color="light" expand="md" light style={{backgroundColor: '#e3f2fd'}}>
            <NavbarBrand href="/">
                <h3>
                    <Badge pill size='lg'>
                        Best&C
                    </Badge>
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
                    <NavItemWithLink {...{to: '/',
                                          label: 'Главная',
                                          table}} />
                    <NavItemWithLink {...{to: '/products/',
                                          label: 'Ткани',
                                          table}} />
                    <NavItemWithLink {...{to: '/customers/',
                                          label: 'Покупатели',
                                          table}} />
                    <NavItemWithLink {...{to: '/orders/',
                                          label: 'Заказы',
                                          table}} />
                    {loaded.isAuthenticated &&
                        <NavItemWithLink {...{to: '/user/',
                                             label: 'Профиль',
                                             table}} />}
                    <NavItem>
                        <AuthButton />
                    </NavItem>
                </Nav>
                <SearchForm {...props}/>
            </Collapse>
        </Navbar>
        <AuthModal />
    </>
}

export default NavBar