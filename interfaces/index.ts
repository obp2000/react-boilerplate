export type IndexUrl = {
  indexUrl: string
}

export type ValidatedFields = {
  notBlank?: string[]
  validEmail?: string
  passwordLength?: string
  validPasswordConfirmation?: string[]
}

export type ValidatedFieldsType = {
  validatedFields: ValidatedFields
}

// export type HtmlAttrs = {
//   name: string
//   id?: string
//   type?: InputType
//   label?: string
//   placeholder?: string
//   required?: boolean
//   readOnly?: boolean
//   'aria-label'?: string
//   min?: number
//   max?: number
//   accept?: string
//   choices?: AnyChoices[]
//   helpText?: string
//   invalid?: boolean
//   valid?: boolean
// }
