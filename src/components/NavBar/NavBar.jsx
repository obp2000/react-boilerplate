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
    Badge,
    Button
} from 'reactstrap'
import { NavLink } from 'react-router-dom'
import AuthModal from '../auth/AuthModal'
import SearchForm from '../Search/SearchForm'
import { TableName } from '../Shared/BasePathname'
import { selectMainMenu } from '../redux/CommonConsts'
import { selectBrandText } from '../redux/CommonConsts'
import { selectOnClickAuthButton, selectAuthButtonLabel } from '../redux/auth'

const NavBar = () => <>
        <Navbar color="primary"
                expand="md"
                dark
                className="py-0 mb-1" >
            <NavbarBrand href="/">
                <h3>
                    <Badge pill size='lg'>{useSelector(selectBrandText)}</Badge>
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
                    {useSelector(selectMainMenu).map(({path: to, label}, key) =>
                        <NavItem key={key}>
                            <NavLink to={to}
                                     className="nav-link"
                                     activeClassName="active">
                                {label}
                            </NavLink>
                        </NavItem>
                    )}
                    <NavItem>
                        <Button color='primary'
                                className='btn-outline-light'
                                onClick={useSelector(selectOnClickAuthButton(useDispatch()))}
                                aria-label='auth' >
                            {useSelector(selectAuthButtonLabel)}
                        </Button>
                    </NavItem>
                </Nav>
                <SearchForm />
            </Collapse>
        </Navbar>
        <AuthModal />
    </>

export default NavBar
