import AuthButton from '@/auth/placeholders/AuthButton'
import Badge from '@/client/Badge'
import Container from '@/client/Container'
import Nav from '@/client/Nav'
import Navbar from '@/client/Navbar'
import NavbarBrand from '@/client/NavbarBrand'
import NavbarCollapse from '@/client/NavbarCollapse'
import Placeholder from '@/client/Placeholder'
import SearchForm from '@/search/placeholders/SearchForm'
import NavItem from './NavItem'

export default function NavBarPlaceholder() {
  return <Placeholder as={Navbar} animation="glow" bg='primary' variant='dark'
    expand='md' className='py-0 mb-1'>
    <Container>
      <NavbarBrand href='/'>
        <h3>
          <Badge pill bg='secondary' >
            <Placeholder bg='secondary'>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;
            </Placeholder>
          </Badge>
        </h3>
      </NavbarBrand>
      <NavbarCollapse id='navbarContent'>
        <Nav className="me-auto" navbar>
          <NavItem />&nbsp;&nbsp;&nbsp;
          <NavItem />&nbsp;&nbsp;&nbsp;
          <NavItem />&nbsp;&nbsp;&nbsp;
          <NavItem />&nbsp;&nbsp;&nbsp;
          <NavItem />&nbsp;&nbsp;&nbsp;&nbsp;
          <AuthButton />
        </Nav>
        <SearchForm />
      </NavbarCollapse>
    </Container>
  </Placeholder>
}
