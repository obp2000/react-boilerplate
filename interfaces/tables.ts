import type { Translation } from "@/app/i18n/dictionaries"
import type {
	PaginateFunction,
	PaginateOptions,
	PaginatedResult
} from "prisma-pagination"
import type { ReactNode } from "react"

export type LayoutProps =  {
	params: { lng: string }
	tableLabels: (arg0: Translation) => string[]
	table: string
	children?: ReactNode
}

export type TableProps<T, SerializedT> = {
	params: { lng: string }
	searchParams: { page?: string, term?: string }
	table: string
	getObjects: ({
	paginate,
	searchParams: { page, term }
}: {
	paginate: PaginateFunction
	searchParams: {
		page?: string
		term?: string
	}
}) => Promise<PaginatedResult<T>>
	createPaginator: (defaultOptions: PaginateOptions) => PaginateFunction
	getTableRow: (dict: Translation) => (arg0: SerializedT) =>
		(string | number | null | JSX.Element)[]
}
