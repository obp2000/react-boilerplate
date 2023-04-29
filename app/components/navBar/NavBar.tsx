import 'server-only'

import type { Translation } from '@/app/i18n/dictionaries'
import AppBar from '@/app/useClient/AppBar'
import Box from '@/app/useClient/Box'
import Container from '@/app/useClient/Container'
import Toolbar from '@/app/useClient/Toolbar'
import Typography from '@/app/useClient/Typography'
import { getUsername } from '@/services/getUser'
import AuthButton from './AuthButton'
import { NavbarMenu, NavbarXsMenu } from './NavbarMenu'
import SearchForm from './SearchForm'
import UserButton from './UserButton'

export default async function NavBar({
	lng,
	dict,
}: {
	lng: string
	dict: Translation
}) {
	// const menu = user ? [...mainMenu, userMenuItem] : mainMenu
	const username = await getUsername()
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
						color: 'inherit',
						textDecoration: 'none',
					}}
				>
					{dict.brandText}
				</Typography>
				<NavbarXsMenu {...{ lng, dict }} />
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
				<NavbarMenu {...{ lng, dict }} />
				<SearchForm searchLabel={dict.search} />
				<Box sx={{ flexGrow: 0 }}>
					{username
						? <UserButton {...{
							name: username,
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
