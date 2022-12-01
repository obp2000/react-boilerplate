'use client'

import { TableOptionsType } from "@/interfaces/options"
import { MainContext } from "@/services/context"
import { useContext } from "react"

export const useObjectLabel = () => {
	const { options } = useContext(MainContext) as TableOptionsType
	return options?.name_singular
}
