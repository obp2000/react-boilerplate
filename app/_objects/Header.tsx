import BackButton from '@/app/components/BackButton'

export default function Header({
	backLabel,
	title,
}: {
	backLabel: string
	title: string
}) {
	return <div className='grid grid-cols-3 mt-1'>
		<BackButton label={backLabel} />
		<div aria-label={title} className='text-xl'>
			{title}
		</div>
	</div>
}
