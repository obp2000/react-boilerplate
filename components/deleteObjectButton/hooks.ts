import type { AnyObjectType } from '@/interfaces/api'
import type { CommonConstsType } from '@/interfaces/commonConsts'
import type { IndexUrl } from '@/interfaces/index'
import { useRouter } from 'next/navigation'
import { deleteObject } from './client'
import { confirm } from '@/confirmation/Confirmation'
import type { ButtonProps } from 'react-bootstrap'
import type { AccessToken } from '@/interfaces/auth'

type Props = Required<AnyObjectType> & IndexUrl & CommonConstsType & AccessToken

export function useButton({ commonConsts, ...props }: Props): ButtonProps {
	const { refresh } = useRouter()
	const onClick = async () => {
		const result = await confirm(`${commonConsts?.delete}?`,
			{ okText: commonConsts?.yes, cancelText: commonConsts?.no })
		if (result) {
			deleteObject({ commonConsts, ...props, refresh })
		}
	}
	return {
		size: 'sm',
		variant: 'outline-primary',
		'aria-labelledby': commonConsts?.delete,
		onClick,
		children: commonConsts?.delete,
	}
}