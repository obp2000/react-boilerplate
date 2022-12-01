export type MainMenuItem = {
	path: string
	label: string
	indexUrl: string
}

export type ErrorMessages = {
	invalid_choice: string
	null: string
	blank: string
	unique: string
	unique_for_date: string
	password_mismatch: string
	invalid_email: string
	short_password: string
	not_integer: string
}

export type CommonConsts = {
	'new': string
	edit: string
	'delete': string
	add: string
	save: string
	successfully: string
	yes: string
	no: string
	search: string
	login: string
	register: string
	main_menu: MainMenuItem[]
	auth_menu_item: MainMenuItem
	user_menu_item: MainMenuItem
	login_menu_item: MainMenuItem
	logout_menu_item: MainMenuItem
	brand_text: string
	error_messages: ErrorMessages
	from: string
	back: string
	not_found: string
	count: string
}

export type CommonConstsType = {
	commonConsts?: CommonConsts
}

export type ErrorMessagesType = {
	errorMessages: ErrorMessages
}
