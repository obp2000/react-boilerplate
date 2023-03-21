import BackButton from '@/app/backButton/Button'
import type { CustomerFormProps } from '@/app/customers/Form'
import Date from '@/app/Date'
import type { OrderFormProps } from '@/app/orders/Form'
import type { ProductFormProps } from '@/app/products/Form'
import Paper from '@/app/useClient/Paper'
import Stack from '@/app/useClient/Stack'
import Typography from '@/app/useClient/Typography'

type CustomerProps = {
	backLabel: string
	title: string
	createdAt?: string
	Form: ((arg0: CustomerFormProps) => JSX.Element)
	formProps: CustomerFormProps
}

type ProductProps = {
	backLabel: string
	title: string
	createdAt?: string
	Form: ((arg0: ProductFormProps) => JSX.Element)
	formProps: ProductFormProps
}

type OrderProps = {
	backLabel: string
	title: string
	createdAt?: string
	Form: ((arg0: OrderFormProps) => JSX.Element)
	formProps: OrderFormProps
}

export default async function Page(props: CustomerProps): Promise<JSX.Element>
export default async function Page(props: ProductProps): Promise<JSX.Element>
export default async function Page(props: OrderProps): Promise<JSX.Element>
export default async function Page({
	backLabel,
	title,
	createdAt,
	Form,
	formProps,
}: any
) {
	return <Paper elevation={3}>
		<Stack direction="row" spacing={2}>
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
				{createdAt && <Date dateString={createdAt} />}
			</Typography>
		</Stack>
		<Form {...formProps} />
	</Paper>
}
