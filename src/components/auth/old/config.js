export const loginFields = [
	{name: 'username', required: true, autoComplete: "username"},
	{name: 'password', type: 'password', autoComplete: "current-password"},
]

export const registerFields = [
	{name: 'username'},
	{name: 'email', type: 'email'},
	{name: 'first_name'},
	{name: 'last_name'},
	{name: 'password1', type: 'password', autoComplete: "new-password"},
	{name: 'password2', type: 'password', autoComplete: "new-password"},
]
