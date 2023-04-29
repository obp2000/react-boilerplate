import BackButton from '@/app/components/BackButton'
import Stack from '@/app/useClient/Stack'
import Typography from '@/app/useClient/Typography'

export default function Header({
	backLabel,
	title,
}: {
	backLabel: string
	title: string
}) {
	return <Stack direction="row" spacing={2}>
		<BackButton label={backLabel} />
		<Typography
			component="h1"
			variant="h6"
			color="inherit"
			align="center"
			noWrap
			aria-label={title}
			sx={{ flex: 1 }}
		>
			{title}
		</Typography>
	</Stack>
}
