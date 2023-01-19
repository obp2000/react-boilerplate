/* eslint-disable react/display-name */
import { AnyObject } from '@/interfaces/api'
import { City } from '@prisma/client'
import { FieldRenderProps } from 'react-final-form'
import { DropdownProps } from 'react-widgets/cjs/DropdownList'
import type { RenderValueProp } from 'react-widgets/cjs/DropdownListInput'

export const getRenderValue = ({
  renderValueComponent: RenderValueComponent,
  lng
}: Omit<FieldRenderProps<any>, 'input' | 'meta'> &
  DropdownProps<any>): RenderValueProp<City | AnyObject> =>
  ({ item }) => <RenderValueComponent object={item} {...{ lng }} />
