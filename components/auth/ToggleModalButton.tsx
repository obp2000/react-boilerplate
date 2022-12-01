'use client'

import Button from '@/client/Button'
import { CommonConstsType } from '@/interfaces/commonConsts'

export default function ToggleModalButton({
    onClick,
    commonConsts
}: { onClick: () => void } & CommonConstsType) {
    return <Button
        color='primary'
        className='btn-outline-light'
        aria-label='auth'
        onClick={onClick}>
        {commonConsts?.login_menu_item.label}
    </Button>
}
