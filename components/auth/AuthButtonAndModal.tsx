'use client'

import Button from '@/client/Button'
import Modal from '@/client/Modal'
import FloatingFormGroup from '@/formInput/FloatingFormGroup'
import { MainContext } from '@/options/context'
import { validate } from "@/validators/validators"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Field, Form } from 'react-final-form'
import { authAction } from './client'
// import { LoginProvider } from './LoginContext'
import { useTranslation } from '@/app/i18n/client'
import { useDisabled } from '@/submitButton/hooks'
import { Prisma } from '@prisma/client'
import loginOptions from './login.json'
import loginFormConfig from './loginFormConfig.json'
import registerOptions from './register.json'
import registerFormConfig from './registerFormConfig.json'

export type Values = Partial<Prisma.UserCreateArgs['data'] &
{ password1?: string, password2?: string }>

export default function AuthButtonAndModal({
  lng
}: { lng: string }) {
  const { t } = useTranslation(lng, 'auth')
  const login = t('login')
  const register = t('register')
  const [modal, setModal] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const {
    indexUrl,
    name,
    validatedFields,
    formFields,
  } = isLogin ? loginFormConfig : registerFormConfig
  const options = isLogin ? loginOptions : registerOptions
  // const { options, isLoading } = use(getOptions(modal ? indexUrl : null)) || {}
  const label = isLogin ? login : register
  const message = isLogin ? t('successful login') : t('successful register')
  const { refresh, replace } = useRouter()
  const onSubmit = (values: Values) =>
    authAction({ values, url: indexUrl, refresh, replace, message, t })
  return <>
    <Button onClick={() => setModal(!modal)} >
      {login}
    </Button>
    <Modal show={modal} onClose={() => setModal(false)} >
      <Modal.Header>
        {label}
      </Modal.Header>
      <Modal.Body>
        <MainContext.Provider value={{ options }}>
          <Form {...{
            name,
            onSubmit,
            validate: validate(validatedFields),
          }} >
            {(props) => <form
              onSubmit={props.handleSubmit}
              className="flex flex-col gap-4">
              {formFields.map((field, key) => <Field key={key} {...field}
                component={FloatingFormGroup} />)}
              <Button
                type='submit'
                size='sm'
                aria-labelledby={label}
                disabled={useDisabled(props)}>
                {label}
              </Button>
            </form>}
          </Form>
        </MainContext.Provider>
        <Button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? register : login}
        </Button>
      </Modal.Body>
    </Modal>
  </>
}
