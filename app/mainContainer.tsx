'use client'

import { MainContext, ObjectsContext } from '@/services/context'
import { FC } from 'react'
import type { MainContainerProps } from '@/interfaces/layout'
import { ObjectsContextType } from '@/interfaces/api'

const MainContainer: FC<MainContainerProps> = ({
	mainContext,
	objectsContext,
	children
}) => {
	return <MainContext.Provider value={mainContext}>
		<ObjectsContext.Provider value={objectsContext as ObjectsContextType}>
			{children}
		</ObjectsContext.Provider>
	</MainContext.Provider>
}

export default MainContainer
