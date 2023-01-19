import 'server-only'

import { getUser } from '@/app/[lng]/user/server'
import AuthItem from '@/auth/AuthItem'
import Navbar from '@/client/Navbar'
import NavbarBrand from '@/client/NavbarBrand'
import NavbarCollapse from '@/client/NavbarCollapse'
import NavbarToggle from '@/client/NavbarToggle'
import SearchForm from '@/search/SearchForm'
import { TFunction } from 'i18next'
import mainMenu from './mainMenu.json'
import NavLink from './NavLink'
import userMenuItem from './userMenuItem.json'

export default function NavBar({
	lng,
	t,
}: { lng: string, t: TFunction }) {
	const user = getUser()
	const menu = user ? [...mainMenu, userMenuItem] : mainMenu
	return <Navbar fluid={true} rounded={true}>
		<NavbarBrand href="/">
			<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
				{t('brand_text')}
			</span>
		</NavbarBrand>
		<div className="flex md:order-2">
			<SearchForm searchLabel={t('search')} />
			<AuthItem {...{ user, lng }} />
		</div>
		<NavbarToggle />
		<NavbarCollapse>
			{menu.map(({ path, label }, key) => <li key={key}>
				<NavLink {...{ path, lng }}>
					{t(label)}
				</NavLink>
			</li>)}
		</NavbarCollapse>
	</Navbar>
}

//<div className="-mt-2 flex flex-wrap items-center">