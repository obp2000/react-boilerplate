import { MainContext } from '@/services/context'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { Button } from 'reactstrap'

export default function BackButton() {
  const router = useRouter()
  const { commonConsts } = useContext(MainContext)
  return <Button
    color='primary'
    outline
    size='sm'
    onClick={() => router.back()}
  >
    {commonConsts?.back}
  </Button>
}
