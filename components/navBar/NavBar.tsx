import 'server-only'

import AuthButtonAndModal from '@/auth/AuthButtonAndModal'
import SighOutButton from '@/auth/SignOutButton'
import Badge from '@/client/Badge'
import Nav from '@/client/Nav'
import Navbar from '@/client/Navbar'
import NavbarBrand from '@/client/NavbarBrand'
import NavbarCollapse from '@/client/NavbarCollapse'
import NavbarToggle from '@/client/NavbarToggle'
import NavItem from '@/client/NavItem'
import SearchForm from '@/search/SearchForm'
import Container from '@/client/Container'
import { MainMenuItem } from '@/interfaces/commonConsts'
import { getOptions } from '@/options/server'
import { getAuth } from '@/auth/server'
import path from 'path'
import NavLink from './NavLink'
import { getUser } from '@/app/user/server'

export default async function NavBar(): Promise<JSX.Element> {
  const dirname = __dirname.replace('/[id]', '')
  const basename = path.basename(dirname)
  // console.log('navbar basename ', basename)
  const indexUrl = `/${basename === 'app' ? 'customers' : basename }/`
  const { isAuthenticated } = getAuth()
  const { commonConsts } = await getOptions(indexUrl)
  // const user = await getUser()
  let mainMenu = commonConsts?.main_menu || []
  let user
  if (isAuthenticated) {
    mainMenu.push(commonConsts?.user_menu_item as MainMenuItem)
    user = getUser()
    // user = getUser()
  }
  // console.log('navbar server comp __dirname ', __dirname)
  return <Navbar bg='primary' variant='dark' expand='md' className='py-0 mb-1'>
    <Container>
      <NavbarBrand href='/'>
        <h3>
          <Badge pill bg='secondary' >
            {commonConsts?.brand_text}
          </Badge>
        </h3>
      </NavbarBrand>
      <NavbarToggle
        className="me-2"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation" />
      <NavbarCollapse id='navbarContent'>
        <Nav className="me-auto" navbar>
          {mainMenu.map((mainMenuItem, key) => <NavItem key={key}>
            <NavLink { ...mainMenuItem } />
          </NavItem>)}
          <NavItem>
            {isAuthenticated
              ? <SighOutButton {...{ commonConsts, user }} />
              : <AuthButtonAndModal {...{ commonConsts }} />}
          </NavItem>
        </Nav>
        <SearchForm {...{ commonConsts }} />
      </NavbarCollapse>
    </Container>
  </Navbar>
}
