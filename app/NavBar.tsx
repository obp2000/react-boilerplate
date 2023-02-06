import 'server-only'

import type { ModelNames, Translation } from '@/app/i18n/dictionaries'
import { getUser } from '@/app/[lng]/user/server'
import AuthButtonAndModal from '@/auth/AuthButtonAndModal'
import SighOutButton from '@/auth/SignOutButton'
import Navbar from '@/client/Navbar'
import NavbarBrand from '@/client/NavbarBrand'
import NavbarCollapse from '@/client/NavbarCollapse'
import NavbarToggle from '@/client/NavbarToggle'
import SearchForm from '@/search/SearchForm'
import mainMenu from './mainMenu.json'
import NavLink from './NavLink'
import userMenuItem from './userMenuItem.json'

export default function NavBar({
	lng,
	dict
}: { lng: string, dict: Translation }) {
	const user = getUser()
	const menu = user ? [...mainMenu, userMenuItem] : mainMenu
	return <Navbar fluid={true} rounded={true}>
		<NavbarBrand href="/">
			<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
				{dict.brandText}
			</span>
		</NavbarBrand>
		<div className="flex md:order-2">
			<SearchForm searchLabel={dict.search} />
			{user
				? <SighOutButton {...{
					lng,
					user,
					labels: {
						logout: dict.auth.logout,
						successfulLogout: dict.auth.successfulLogout,
					}
				}} />
				: <AuthButtonAndModal {...{
					lng,
					labels: dict.auth,
					errorMessages: dict.errorMessages
				}} />}
		</div>
		<NavbarToggle />
		<NavbarCollapse>
			{menu.map(({ path, label }, key) => <li key={key}>
				<NavLink {...{ path, lng }}>
					{dict[label as keyof ModelNames].plural as string ||
						dict[label as keyof Translation] as string
					}
				</NavLink>
			</li>)}
		</NavbarCollapse>
	</Navbar>
}
