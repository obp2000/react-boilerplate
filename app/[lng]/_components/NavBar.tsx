import 'server-only'

import { getDictionary } from '@/app/i18n/dictionaries'
import NavbarLink from "./NavbarLink"
import mainMenu from './mainMenu.json'
import { getUsername } from '@/services/getUser'
import { type ReactNode, Suspense } from 'react'
import SearchForm from './SearchForm'
import NavbarXsMenu from './NavbarXsMenu'
import { navLinkLabel } from './navBarLib'
import {
	SearchForm as SearchFormSkeleton
} from '@/app/components/Skeletons'

export default async function NavBar({
	lng,
	userButton,
	authButton,
}: {
	lng: string
	userButton: ReactNode
	authButton: ReactNode
}) {
	const dict = await getDictionary(lng)
	const username = await getUsername()
	return <nav className="flex flex-no-wrap justify-between items-center relative w-full bg-blue-600 py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4">
		<div className="flex flex-wrap justify-between items-center w-full px-3">
			<div className='flex md:hidden'>
				<NavbarXsMenu {...{ lng, dict }} />
			</div>
			<div className='md:hidden flex font-mono text-neutral-700 uppercase'>
				{dict.brandText}
			</div>
			<div className='md:flex hidden font-mono text-xl text-neutral-200 uppercase'>
				{dict.brandText}
			</div>
			<div className='hidden md:flex gap-4 mx-4'>
				{mainMenu.map(({ path, label }) => <div
					key={path}
					className='hover:opacity-50 text-xl'>
					<NavbarLink
						{...{ lng, path }}
						label={navLinkLabel({ dict, label })} />
				</div>
				)}
			</div>
			<Suspense fallback={<SearchFormSkeleton />}>
				<SearchForm {...{
					lng,
					searchLabel: dict.search
				}} />
			</Suspense>
			{username ? userButton : authButton}
		</div>
	</nav>
}
