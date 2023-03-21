import 'server-only'

import type { ModelNames, Translation } from '@/app/i18n/dictionaries'
import { getUser } from '@/app/user/server'
import AuthButtonAndModal from '@/app/auth/AuthButtonAndModal'
import SighOutButton from '@/app/auth/SignOutButton'
import AppBar from '@/app/useClient/AppBar'
import Box from '@/app/useClient/Box'
import Container from '@/app/useClient/Container'
import Toolbar from '@/app/useClient/Toolbar'
import Typography from '@/app/useClient/Typography'
import mainMenu from './mainMenu.json'
import NavbarXsMenu from './NavbarXsMenu'
import NavLink from './NavLink'
import NavLinkXs from './NavLinkXs'
import SearchForm from '@/app/searchForm/SearchForm'
import userMenuItem from './userMenuItem.json'

export default function NavBar({
	lng,
	dict
}: {
	lng: string
	dict: Translation
}) {
	const user = getUser()
	const menu = user ? [...mainMenu, userMenuItem] : mainMenu
	return <AppBar position="static">
		<Container maxWidth="xl">
			<Toolbar disableGutters>
				<Typography
					variant="h6"
					noWrap
					component="a"
					href="/"
					sx={{
						mr: 2,
						display: { xs: 'none', md: 'flex' },
						fontFamily: 'monospace',
						fontWeight: 700,
						letterSpacing: '.3rem',
						color: 'inherit',
						textDecoration: 'none',
					}}
				>
					{dict.brandText}
				</Typography>
				<NavbarXsMenu>
					{menu.map(({ path, label }, key) => <NavLinkXs key={key} {...{ path, lng }}>
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
						letterSpacing: '.3rem',
						color: 'inherit',
						textDecoration: 'none',
					}}
				>
					{dict.brandText}
				</Typography>
				<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
					{menu.map(({ path, label }, key) => <NavLink key={key} {...{ path, lng }}>
						{dict[label as keyof ModelNames].plural as string ||
							dict[label as keyof Translation] as string}
					</NavLink>)}
				</Box>
				<SearchForm {...{ searchLabel: dict.search, lng }} />
				<Box sx={{ flexGrow: 0 }}>
					{user
						? <SighOutButton {...{
							lng,
							username: user.username,
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
				</Box>


				{/*              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}*/}

				{/*            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}*/}

				{/*			<NavbarBrand href="/">
				<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
					{dict.brandText}
				</span>
			</NavbarBrand>*/}
				{/*			<div className="flex md:order-2">
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
			</NavbarCollapse>*/}

			</Toolbar>
		</Container>
	</AppBar>
}
