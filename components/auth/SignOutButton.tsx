'use client'

import Button from '@/client/Button'
import { CommonConstsType } from '@/interfaces/commonConsts'
import { UserType } from "@/interfaces/users"
import { useSignOutButton } from './hooks'

export default function SignOutButton(props: CommonConstsType & UserType) {
  return <Button {...useSignOutButton(props)} />
}
