import MainContainer from '@/app/mainContainer'
import { mainContext, getObject } from '@/services/api/server'
import ClientPage from './clientPage'
import { indexUrl } from '@/products/serverConfig'
import { Params } from '@/interfaces/api'

const Page = async ({ params }: Params) => {
	// const object = await getObject(indexUrl, params?.id)
	return <MainContainer
		mainContext={await mainContext(indexUrl)}
		objectsContext={{object: await getObject(indexUrl, params?.id)}}
	>
		<ClientPage />
	</MainContainer>
}

export default Page
