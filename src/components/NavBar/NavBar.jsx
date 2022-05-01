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
import { NavLink, Redirect, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from 'react-loader'
import AuthModal from '../auth/AuthModal'
import SearchForm from '../Search/SearchForm'
import { selectAuth, toggleModal } from '../redux/auth'
import { useGetOptionsQuery, useSignOutMutation } from '../../services/apiSlice'
import SignOutButton from '../auth/SignOutButton'

const NavBar = ({ indexUrl }) => {
    const { isAuthenticated, user } = useSelector(selectAuth)
    // const { push } = useHistory()
    const {
        data: {
            commonConsts = {}
        } = {},
        isLoading,
        isFetching: isOptionsFetching,
        isSuccess,
        isError,
        error
    } = useGetOptionsQuery(indexUrl)
    const { login, register } = commonConsts
    const dispatch = useDispatch()
    const [
        signOutAction,
        {
            isLoading: isLoadingSignOut,
            data: {
                detail: successSignOutMessage
            } = {},
            isSuccess: isSuccessSignOut,
            isError: isErrorSignOut,
            error: signOutError
        }
    ] = useSignOutMutation()
    let authButtonLabel = commonConsts?.auth_menu_item?.label
    if (isAuthenticated) authButtonLabel = `${authButtonLabel} (${user?.username || ''})`
    const onClickAuthButton = isAuthenticated ? () => signOutAction() : () => dispatch(toggleModal())
    return <>
        <Loader loaded={!isLoadingSignOut}>
            <Navbar color="primary"
                    expand="md"
                    dark
                    className="py-0 mb-1" >
                <NavbarBrand href="/">
                    <h3>
                        <Badge pill size='lg'>{commonConsts?.brand_text}</Badge>
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
                        {commonConsts?.main_menu?.map(({path: to, label}, key) =>
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
                                    onClick={onClickAuthButton}
                                    aria-label='auth' >
                                    {authButtonLabel}
                            </Button>
                        </NavItem>
                    </Nav>
                    <SearchForm {...commonConsts} />
                </Collapse>
            </Navbar>
        </Loader>
        <AuthModal {...commonConsts} />
    </>
}

export default NavBar
