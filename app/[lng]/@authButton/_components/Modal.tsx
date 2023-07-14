'use client'

import { LockOutlined } from '@mui/icons-material'
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import { useRouter } from 'next/navigation'

import type { ReactNode } from 'react'

export default function Modal({
  label,
  busy,
  path,
  actionLabel,
  children,
}: {
  label: string
  busy: boolean
  path: string
  actionLabel: string
  children: ReactNode
}) {
  const { back, replace } = useRouter()
  return <Dialog open={true} onClose={back} >
    <DialogTitle>
      <div>
        <Avatar><LockOutlined /></Avatar>
        <div className='text-xl'>
          {label}
        </div>
      </div>
    </DialogTitle>
    <DialogContent>
      {children}
      <DialogActions>
        <div
          onClick={busy ? undefined : () => replace(path)}
          className={`flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-blue-700 bg-blue-100 border border-blue-300${busy ? ' opacity-70' : ''}`}>
          <div className="cursor-pointer text-xs font-normal leading-none max-w-full flex-initial">
            {actionLabel}
          </div>
        </div>
      </DialogActions>
    </DialogContent>
  </Dialog>
}
