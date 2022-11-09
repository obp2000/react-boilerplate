// import { useRouter } from 'next/router'
import { useRouter } from 'next/navigation'
import { FC, useContext } from 'react'
import { Button } from 'reactstrap'
import { MainContext } from '@/services/context'

const BackButton: FC = () => {
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

export default BackButton
