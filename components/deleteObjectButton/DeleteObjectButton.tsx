'use client'

import Button from '@/client/Button'
import type { AnyObjectType } from '@/interfaces/api'
import { AccessToken } from '@/interfaces/auth'
import { CommonConstsType } from '@/interfaces/commonConsts'
import { IndexUrl } from '@/interfaces/index'
import { useButton } from './hooks'

type Props = Required<AnyObjectType> & IndexUrl & CommonConstsType &
  Required<AccessToken>

export default function DeleteObjectButton(props: Props) {
  return <Button {...useButton(props)} />
}


// import 'server-only'

// import type { AnyObjectType } from '@/interfaces/api'
// import { IndexUrl } from '@/interfaces/index'
// import { getAuth } from '@/services/api/server'
// import DeleteObjectButtonClient from './DeleteObjectButtonClient'
// import { CommonConstsType } from '@/interfaces/commonConsts'

// export default function DeleteObjectButton({
//   object,
//   indexUrl,
//   commonConsts
// }: Required<AnyObjectType> & IndexUrl & CommonConstsType) {
//   const { accessToken } = getAuth()
//   return <DeleteObjectButtonClient {...{
//     object, indexUrl, commonConsts, accessToken
//   }} />
// }
