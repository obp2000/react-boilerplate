'use client'

import type { Translation } from '@/app/i18n/dictionaries'
import Button from '@/app/useClient/Button'
import Chip from '@/app/useClient/Chip'
import Stack from '@/app/useClient/Stack'
import Typography from '@/app/useClient/Typography'
import LoginForm from '@/app/user/LoginForm'
import RegisterForm from '@/app/user/RegisterForm'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useState, useTransition } from 'react'

export default function AuthButton({
  labels,
  errorMessages
}: {
  labels: Translation['auth']
  errorMessages: Translation['errorMessages']
}) {
  const [modal, setModal] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const AuthComp = isLogin ? LoginForm : RegisterForm
  const [isPending, startTransition] = useTransition()
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
        <AuthComp {...{
          labels,
          errorMessages,
          isPending,
          startTransition,
          setModal,
        }} />
        <DialogActions>
          <Chip
            label={isLogin ? labels?.register : labels?.login}
            onClick={() => setIsLogin(!isLogin)}
            disabled={isPending}
          />
        </DialogActions>
      </DialogContent>
    </Dialog>
  </>
}
