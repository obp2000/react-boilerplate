import 'server-only'

import AuthButtonAndModal from '@/auth/AuthButtonAndModal'
import SighOutButton from '@/auth/SignOutButton'
import Collapse from '@/client/Collapse'
import Nav from '@/client/Nav'
import Navbar from '@/client/Navbar'
import NavItem from '@/client/NavItem'
import SearchForm from '@/search/SearchForm'
import { indexUrl as userIndexUrl } from '@/app/user/serverConfig'
import Badge from '@/client/Badge'
import NavbarBrand from '@/client/NavbarBrand'
import NavbarToggler from '@/client/NavbarToggler'
import { MainMenuItem } from '@/interfaces/commonConsts'
import { IndexUrl } from '@/interfaces/index'
import { getOptions } from '@/services/api/options'
import { getAuth, getUser } from '@/services/api/server'
import NavLink from './NavLink'

export default async function NavBar({
  indexUrl,
  auth
}: IndexUrl & { auth: boolean }) {
  const { isAuthenticated } = getAuth()
  const { commonConsts } = await getOptions(indexUrl, auth)
  const user = await getUser(userIndexUrl)
  let mainMenu = commonConsts?.main_menu || []
  if (isAuthenticated) {
    mainMenu.push(commonConsts?.user_menu_item as MainMenuItem)
  }
  // console.log('navbar server comp', commonConsts?.main_menu)
  return <Navbar color='primary' expand='md' dark className='py-0 mb-1'>
    <NavbarBrand href="/">
      <h3>
        <Badge pill size='lg'>
          {commonConsts?.brand_text}
        </Badge>
      </h3>
    </NavbarBrand>
    <NavbarToggler
      className="me-2"
      data-bs-toggle="collapse"
      data-bs-target="#navbarContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation" />
    <Collapse navbar id='navbarContent'>
      <Nav className="me-auto" navbar>
        {mainMenu.map((mainMenuItem, key) => <NavItem key={key}>
          <NavLink {...{ ...mainMenuItem, indexUrl }} />
        </NavItem>)}
        <NavItem>
          {isAuthenticated
            ? <SighOutButton {...{ commonConsts, user }} />
            : <AuthButtonAndModal {...{ commonConsts }} />}
        </NavItem>
      </Nav>
      <SearchForm {...{ commonConsts }} />
    </Collapse>
  </Navbar>
}
