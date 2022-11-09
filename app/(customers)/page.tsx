import MainContainer from '@/app/mainContainer'
import { indexUrl } from '@/customers/serverConfig'
import { SearchParams } from '@/interfaces/api'
import { mainContext, getObjects } from '@/services/api/server'
import ClientPage from './clientPage'

const Page = async ({ searchParams }: SearchParams) => {
	// console.log('searchParams ', searchParams)
	return <MainContainer
		mainContext={await mainContext(indexUrl)}
		objectsContext={await getObjects(indexUrl, searchParams)} >
		{/*<div>ssssss111</div>*/}
		<ClientPage />
	</MainContainer>
}

// const Page = async ({
// 	searchParams
// }: { searchParams: Record<string, string> }) => {
// 		return <div>ssssss111</div>
// }


export default Page
