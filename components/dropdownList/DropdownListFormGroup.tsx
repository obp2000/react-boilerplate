'use client'

import type { DropdownListAttrs } from '@/interfaces/dropdownList'
import DropdownList from './DropdownList'
import Col from '@/client/Col'
import Row from '@/client/Row'
import { useFieldProps } from './hooks'
import { useFieldProps as useLabelProps } from '@/inputLabel/hooks'
import Form from '@/client/FormBootstrap'

export default function DropdownListFormGroup(props: DropdownListAttrs) {
  const { id } = useFieldProps(props)
  const { label, required } = useLabelProps(props)
  return <Form.Group as={Row} controlId={id} className='mb-3'>
    <Form.Label column sm='2'>
      {`${label}${required ? '*' : ''}`}
    </Form.Label>
    <Col sm='10'>
      <DropdownList {...props} />
    </Col>
  </Form.Group>
}
