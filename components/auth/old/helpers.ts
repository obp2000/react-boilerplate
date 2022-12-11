import 'server-only'

import { CommonConsts } from '@/interfaces/commonConsts'
import { User } from '@/interfaces/users'

export function signOutButtonLabel(
	commonConsts: CommonConsts | undefined,
	user: User
) {
	return `${commonConsts?.logout_menu_item.label} (${user?.username})`
}
