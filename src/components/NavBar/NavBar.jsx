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
import { NavLink, useLocation, useParams } from 'react-router-dom'
import AuthModal from '../auth/AuthModal'
import SearchForm from '../Search/SearchForm'
import { selectMainMenu, selectCommonConsts } from '../redux/CommonConsts'
import { selectOnClickAuthButton, authButtonLabel, selectAuth } from '../redux/auth'
import { useGetOptionsQuery, useCommonConsts } from '../../services/apiSlice'

const NavBar = ({ index_url }) => {
    const auth = useSelector(selectAuth)
    // console.log('useLocation ', useLocation())
    // let common_consts = {}
    const {
        data: {
            common_consts
        } = {},
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetOptionsQuery({
        url: index_url,
        params: {
            isAuthenticated: auth?.isAuthenticated
        }
    })
    // const common_consts = useCommonConsts({
    //     url: index_url,
    //     params: {
    //         isAuthenticated: auth?.isAuthenticated
    //     }
    // })

    console.log('auth ', auth)
    return <>
        <Navbar color="primary"
                expand="md"
                dark
                className="py-0 mb-1" >
            <NavbarBrand href="/">
                <h3>
                    <Badge pill size='lg'>{common_consts?.brand_text}</Badge>
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
                    {common_consts?.main_menu?.map(({path: to, label}, key) =>
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
                            {authButtonLabel(auth, common_consts)}
                        </Button>
                    </NavItem>
                </Nav>
                <SearchForm {...common_consts} />
            </Collapse>
        </Navbar>
        <AuthModal />
    </>
}

export default NavBar
