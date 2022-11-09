import MainContainer from '@/app/mainContainer'
import { mainContext, getObject } from '@/services/api/server'
import ClientPage from './clientPage'
import { indexUrl } from '@/customers/serverConfig'
import { Params } from '@/interfaces/api'

const Page = async ({ params }: Params) => {
	// const object = await getObject(indexUrl, params?.id)
	return <MainContainer
		mainContext={await mainContext(indexUrl)}
		objectsContext={{object: await getObject(indexUrl, params?.id)}}
	>
		{/*<div>ssssss111</div>*/}
		<ClientPage />
	</MainContainer>
}

export default Page
