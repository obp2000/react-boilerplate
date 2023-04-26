import 'server-only'

import type { ModelNames, Translation } from '@/app/i18n/dictionaries'
import AuthButton from './AuthButton'
import UserButton from './UserButton'
import AppBar from '@/app/useClient/AppBar'
import Box from '@/app/useClient/Box'
import Container from '@/app/useClient/Container'
import Toolbar from '@/app/useClient/Toolbar'
import Typography from '@/app/useClient/Typography'
import mainMenu from './mainMenu.json'
import { NavbarXsMenu, NavLinkXs, NavLink } from './NavbarMenu'
import SearchForm from './SearchForm'
import type { UserObject as User } from "@/interfaces/users"

export default function NavBar({
	lng,
	dict,
	user
}: {
	lng: string
	dict: Translation
	user?: User | null
}) {
	// const menu = user ? [...mainMenu, userMenuItem] : mainMenu
	return <AppBar position="static">
		<Container maxWidth="xl">
			<Toolbar disableGutters>
				<Typography
					variant="h6"
					noWrap
					component="a"
					href="/"
					sx={{
						mr: 5,
						display: { xs: 'none', md: 'flex' },
						fontFamily: 'monospace',
						fontWeight: 700,
						// letterSpacing: '.3rem',
						color: 'inherit',
						textDecoration: 'none',
					}}
				>
					{dict.brandText}
				</Typography>
				<NavbarXsMenu>
					{mainMenu.map(({ path, label }, key) => <NavLinkXs key={key} {...{ path, lng }}>
						{dict[label as keyof ModelNames].plural as string ||
							dict[label as keyof Translation] as string}
					</NavLinkXs>)}
				</NavbarXsMenu>
				<Typography
					variant="h5"
					noWrap
					component="a"
					href=""
					sx={{
						mr: 2,
						display: { xs: 'flex', md: 'none' },
						flexGrow: 1,
						fontFamily: 'monospace',
						fontWeight: 700,
						// letterSpacing: '.3rem',
						color: 'inherit',
						textDecoration: 'none',
					}}
				>
					{dict.brandText}
				</Typography>
				<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
					{mainMenu.map(({ path, label }, key) => <NavLink key={key} {...{ path, lng }}>
						{dict[label as keyof ModelNames].plural as string ||
							dict[label as keyof Translation] as string}
					</NavLink>)}
				</Box>
				<SearchForm searchLabel={dict.search} />
				<Box sx={{ flexGrow: 0 }}>
					{user
						? <UserButton {...{
							name: String(user.name),
							labels: {
								profile: dict.profile,
								logout: dict.auth.logout,
								successfulLogout: dict.auth.successfulLogout
							}
						}} />
						: <AuthButton {...{
							labels: dict.auth,
							errorMessages: dict.errorMessages
						}} />}
				</Box>
			</Toolbar>
		</Container>
	</AppBar>
}
