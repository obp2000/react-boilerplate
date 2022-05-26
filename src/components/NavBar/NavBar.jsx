import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Badge,
  Button,
} from 'reactstrap'
import {NavLink, useLocation} from 'react-router-dom'
import Loader from 'react-loader'
import AuthModal from '../auth/AuthModal'
import SearchForm from '../Search/SearchForm'
import {selectAuth, toggleModal} from '../redux/auth'
import {useGetOptionsQuery, useSignOutMutation} from '../../services/apiSlice'
import config from '../Config'
import {tableName} from '../Shared/BasePathname'

const NavBar = () => {
  const {isAuthenticated, user} = useSelector(selectAuth)
  const {indexUrl} = config[tableName(useLocation())] || {}
  const {
    data: {
      commonConsts = {},
    } = {},
    // currentData,
    // isLoading,
    isFetching: isOptionsFetching,
    // isSuccess,
    // isError,
    // error
  } = useGetOptionsQuery(indexUrl)
  // const {
  //   commonConsts,
  //   isFetching: isOptionsFetching,
  // } = useGetOptionsQuery(undefined, {selectFromResult: ({data}) => data})
  // const data1 = useGetOptionsQuery(indexUrl,
  //   {selectFromResult: ({data, isFetching}) => ({...data, isFetching})})

  // const res = apiSlice.endpoints.getOptions.useQueryState(indexUrl)
  // console.log('data1 ', data1)
  const dispatch = useDispatch()
  const [
    signOutAction,
    {
      isLoading: isSigningOut,
      // data: {
      //     detail: successSignOutMessage
      // } = {},
      // isSuccess: isSuccessSignOut,
      // isError: isErrorSignOut,
      // error: signOutError
    },
  ] = useSignOutMutation()
  let authButtonLabel = commonConsts?.auth_menu_item?.label
  if (isAuthenticated) {
    authButtonLabel =
    `${authButtonLabel} (${user?.username || ''})`
  }
  const onClickAuthButton = isAuthenticated ?
    () => signOutAction() :
    () => dispatch(toggleModal())
  const busy = isOptionsFetching || isSigningOut
  return <Loader loaded={!busy}>
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
              <NavLink to={to} className={({isActive}) =>
                'nav-link' + (isActive ? ' active' : '')}>
                {label}
              </NavLink>
            </NavItem>,
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
    <AuthModal {...commonConsts} />
  </Loader>
}

export default NavBar
