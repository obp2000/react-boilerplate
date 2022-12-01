import 'server-only'

import { CommonConstsType } from '@/interfaces/commonConsts'
import { UserType } from '@/interfaces/users'
import SignOutButtonClient from './SignOutButtonClient'

export default async function SignOutButton({
  commonConsts,
  user
}: CommonConstsType & UserType) {
  return <SignOutButtonClient {...{ commonConsts, user }} />
}
