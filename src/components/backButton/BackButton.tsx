import React from 'react'
import { useRouter } from 'next/router'
import { Button } from 'reactstrap'
import type { CommonConstsType } from '../../../interfaces'

const BackButton = ({ commonConsts }: CommonConstsType): JSX.Element => {
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
