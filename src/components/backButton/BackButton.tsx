import React from 'react'
import { useRouter } from 'next/router'
import { Button } from 'reactstrap'
import { CommonConsts } from '../../../interfaces'

type Props = {
  commonConsts?: CommonConsts
}

const BackButton = ({ commonConsts }: Props): JSX.Element => {
  const router = useRouter()
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
