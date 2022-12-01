import type { AnyObjectFormValues } from '@/interfaces/objectForm'
import { mutateObject } from '@/services/api/client'
import { AuthContext, MainContext } from '@/services/context'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

export const useOnSubmit = (
  id: string | undefined,
  modFormValues: Function,
  contentType: string = 'application/json'
) => {
  const { commonConsts, indexUrl } = useContext(MainContext)
  const { accessToken } = useContext(AuthContext)
  const { refresh, push } = useRouter()
  return (values: AnyObjectFormValues) =>
    mutateObject(id, modFormValues(values), indexUrl as string,
      accessToken as string, commonConsts?.successfully, refresh,
      push, contentType)
}


// export const useTestObjectId = (id: string | string[] | undefined) =>
//   (typeof id === 'string') && id.match(/^\d+$/)
