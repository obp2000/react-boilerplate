import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    Button,
    // Modal,
    // ModalHeader,
    // ModalTitle,
    // ModalBody,
} from 'reactstrap'
// import Search from '../Search/Containers/Search'
import NavItemWithLink from './NavItemWithLink'
import AuthModal from '../auth/Containers/AuthModal'
// import Errors from '../Errors'

const NavBar = ({
        isAuthenticated,
        signOut,
        toggleModal,
        // errors
    }) => <>
    <Navbar color="light" expand="md" light>
        <NavbarBrand href="/">
            Best&C
        </NavbarBrand>
        <NavbarToggler className="me-2"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation" />
        <Collapse navbar id="navbarSupportedContent">
            <Nav className="me-auto" navbar>
                <NavItemWithLink to='/' label='Главная' />
                <NavItemWithLink to='/products/' label='Ткани' />
                <NavItemWithLink to='/customers/' label='Покупатели' />
                <NavItemWithLink to='/orders/' label='Заказы' />
                {isAuthenticated && <NavItemWithLink to='/user/' label='Профиль' />}
                <NavItem>
                    <Button size='sm' outline onClick={isAuthenticated ? signOut : toggleModal}>
                        {isAuthenticated ? 'Выйти' : 'Вход/Регистрация'}
                    </Button>
                </NavItem>
            </Nav>
        </Collapse>
    </Navbar>
    <AuthModal />
    </>

NavBar.propTypes = {
    isAuthenticated: PropTypes.bool,
    signOut: PropTypes.func,
    toggleModal: PropTypes.func,
    // errors: PropTypes.array
}

export default NavBar