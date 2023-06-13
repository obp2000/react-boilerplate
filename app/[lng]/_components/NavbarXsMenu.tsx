'use client'

import { Menu, MenuItem } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type MouseEvent } from 'react'
import type { Translation } from '@/app/i18n/dictionaries'
import mainMenu from './mainMenu.json'
import { isActiveLink, navLinkLabel } from './navBarLib'

export function NavbarXsLink({
	lng,
	path,
	label
}: {
	lng: string
	path: string
	label: string
}) {
	const href = `/${lng}${path}`
	const active = isActiveLink({
		href,
		path,
		pathname: usePathname()
	})
	return <MenuItem selected={active}>
		<Link
			href={href}
			style={{ textDecoration: 'none' }}
			prefetch={false}
		>
			{label}
		</Link>
	</MenuItem>
}

export default function NavbarXsMenu({
	lng, dict
}: {
	lng: string,
	dict: Translation
}) {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
	const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}
	const handleCloseNavMenu = () => {
		setAnchorElNav(null) 
	}
	return <>
		<button
			className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden cursor-pointer"
			type="button"
			aria-controls="menu-appbar"
			aria-expanded="false"
			aria-label="Toggle navigation"
			onClick={handleOpenNavMenu}
		>
			<span className="[&>svg]:w-7">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="h-7 w-7">
					<path
						fillRule="evenodd"
						d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
						clipRule="evenodd" />
				</svg>
			</span>
		</button>
		{/*</IconButton>*/}
		<Menu
			id="menu-appbar"
			anchorEl={anchorElNav}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'left',
			}}
			open={Boolean(anchorElNav)}
			onClose={handleCloseNavMenu}
			sx={{
				display: { xs: 'block', md: 'none' },
			}}
		>
			{mainMenu.map(({ path, label }) => <NavbarXsLink
				key={path}
				lng={lng}
				path={path}
				label={navLinkLabel({ dict, label })} />
			)}
		</Menu>
	</>
}
