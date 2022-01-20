import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import {
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap'
import NavLink from './NavLink'
import NavItem from './NavItem'
// import Search from '../Search/Containers/Search'
import LoginForm from '../auth/Containers/LoginForm'
import RegisterForm from '../auth/Containers/RegisterForm'
// import Errors from '../Errors'

const NavBar = ({
        isAuthenticated,
        toggleModal,
        signOut,
        modal,
        login,
        toggleLogin,
        errors
    }) => <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
            <span className="badge badge-secondary">Best C</span>
        </Link>
        <button className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <NavItem className="active">
                    <NavLink to='/'>
                        Главная
                        <span className="sr-only">(current)</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to='/products' text='Ткани'/>
                </NavItem>
                <NavItem>
                    <NavLink to='/customers' text='Покупатели'/>
                </NavItem>
                <NavItem>
                    <NavLink to='/orders' text='Заказы'/>
                </NavItem>
                {isAuthenticated && <NavItem>
                    <NavLink to='/user/' text='Профиль'/>
                </NavItem>}
                <NavItem>
                    <a className="nav-link" style={{cursor: 'pointer' }}
                       onClick={isAuthenticated ? signOut : toggleModal}>
                        {isAuthenticated ? 'Выйти' : 'Вход/Регистрация'}
                    </a>
                </NavItem>
            </ul>
        </div>
        <Modal isOpen={modal}>
            <ModalHeader toggle={toggleModal}>{login
                    ? 'Вход'
                    : 'Регистрация'}</ModalHeader>
            <ModalBody>
                {login
                    ? <LoginForm/>
                    : <RegisterForm/>}
                <div className="row">
                    <div className="col-sm-10 offset-sm-1">
                        <a className="nav-link" style={{cursor: 'pointer'}}
                            onClick={toggleLogin}>
                            {login ? 'Регистрация' : 'Вход'}
                        </a>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    </nav>
    </>

    NavBar.propTypes = {
        isAuthenticated: PropTypes.bool,
        toggleModal: PropTypes.func,
        signOut: PropTypes.func,
        modal: PropTypes.bool,
        login: PropTypes.bool,
        toggleLogin: PropTypes.func,
        // errors: PropTypes.array
    }

export default NavBar