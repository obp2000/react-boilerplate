import { FC } from 'react'
import { Button } from 'reactstrap'
import { useDeleteObject } from './hooks'
import { AnyObject } from '@/interfaces/api'

const DeleteObjectButton: FC<AnyObject> = (props) => {
  return <Button
    size='sm'
    outline
    {...useDeleteObject(props)}
  />
}

export default DeleteObjectButton
