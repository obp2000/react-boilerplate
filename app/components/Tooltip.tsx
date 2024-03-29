import type { ReactNode } from 'react'

export default function Tooltip({
	title, children
}: {
	title: string
	children: ReactNode
}) {
	return <div className="group cursor-pointer relative inline-block w-14 text-center">
		{children}
		<div className="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-1/2 px-3 pointer-events-none">
			{title}
			<svg className="absolute text-black h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve">
				<polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
			</svg>
		</div>
	</div>
}