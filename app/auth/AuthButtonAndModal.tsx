'use client'

import type { Translation } from '@/app/i18n/dictionaries'
import Button from '@/app/useClient/Button'
import Dialog from '@mui/material/Dialog'
import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Typography from '@/app/useClient/Typography'
import Stack from '@/app/useClient/Stack'

export default function AuthButtonAndModal({
  lng,
  labels,
  errorMessages
}: {
  lng: string
  labels: Translation['auth']
  errorMessages: Translation['errorMessages']
}) {
  const [modal, setModal] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const AuthComp = isLogin ? LoginForm : RegisterForm
  return <>
    <Button color='inherit' onClick={() => setModal(!modal)} >
      {labels?.login}
    </Button>
    <Dialog open={modal} onClose={() => setModal(false)} >
      <DialogTitle>
        <Stack direction="row" spacing={2}>
          <Avatar><LockOutlinedIcon /></Avatar>
          <Typography
            component="h3"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flex: 1 }}
          >
            {isLogin ? labels?.login : labels?.register}
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <AuthComp {...{ lng, setModal, labels, errorMessages }} />
        <DialogActions>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400 pt-2">
            <a href="#"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? labels?.register : labels?.login}
            </a>
          </p>
        </DialogActions>
      </DialogContent>
    </Dialog>
  </>
}
