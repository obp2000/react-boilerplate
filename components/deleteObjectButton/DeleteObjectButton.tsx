import 'server-only'

import type { AnyObjectType } from '@/interfaces/api'
import { IndexUrl } from '@/interfaces/index'
import { getAuth } from '@/services/api/server'
import DeleteObjectButtonClient from './DeleteObjectButtonClient'
import { CommonConstsType } from '@/interfaces/commonConsts'

export default async function DeleteObjectButton({
  object,
  indexUrl,
  commonConsts
}: Required<AnyObjectType> & IndexUrl & CommonConstsType) {
  const { accessToken } = getAuth()
  return <DeleteObjectButtonClient {...{
    object, indexUrl, commonConsts, accessToken
  }} />
}
