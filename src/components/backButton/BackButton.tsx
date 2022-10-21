import { useRouter } from 'next/router'
import { FC, useContext } from 'react'
import { Button } from 'reactstrap'
import { OptionsContext } from '../layout/Layout'

const BackButton: FC = () => {
  const router = useRouter()
  const { commonConsts } = useContext(OptionsContext)
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
