import { mainContext, getObjects } from '@/services/api/server'
import MainContainer from '@/app/mainContainer'
import ClientPage from './clientPage'
import { indexUrl } from '@/orders/serverConfig'
import { SearchParams } from '@/interfaces/api'

const Page = async ({ searchParams }: SearchParams) => {
	// console.log('searchParams ', searchParams)
	return <MainContainer
		mainContext={await mainContext(indexUrl)}
		objectsContext={await getObjects(indexUrl, searchParams)} >
		{/*<div>ssssss111</div>*/}
		<ClientPage />
	</MainContainer>
}

export default Page
