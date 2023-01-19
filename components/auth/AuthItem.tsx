'use client'

import { User } from '@prisma/client'
import dynamic from 'next/dynamic'
// import AuthButtonAndModal from '@/auth/AuthButtonAndModal'

const DynamicAuthButtonAndModal = dynamic(() => import('@/auth/AuthButtonAndModal'), {
  loading: () => <>Loading...</>,
  // ssr: false,
})

const DynamicSighOutButton = dynamic(() => import('@/auth/SignOutButton'), {
  loading: () => <>Loading...</>,
  // ssr: false,
})

export default function AuthItem({ user, lng }: { user: User, lng: string }) {
	return user
		? <DynamicSighOutButton {...{ user, lng }} />
		: <DynamicAuthButtonAndModal {...{ lng }} />
}
