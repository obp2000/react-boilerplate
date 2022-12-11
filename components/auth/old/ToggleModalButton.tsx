'use client'

import Button from '@/client/Button'
import { MainContext } from '@/options/context'
import { useContext } from 'react'

export default function ToggleModalButton({
    onClick
}: { onClick: () => void }) {
    const { commonConsts } = useContext(MainContext)
    return <Button
        variant='outline-light'
        aria-label='auth'
        onClick={onClick}>
        {commonConsts?.login_menu_item.label}
    </Button>
}
