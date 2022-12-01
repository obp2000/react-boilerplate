import { TableOptionsType } from "./options"

export type TableRowType<ObjectType> = {
  object: ObjectType
}

export type HeaderProps = TableOptionsType & {
  totalCount: number,
}
