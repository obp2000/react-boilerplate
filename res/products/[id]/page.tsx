import { getObject } from '@/services/api/server'
import { indexUrl } from '@/products/serverConfig'
import { Params } from '@/interfaces/api'
import { ObjectsProvider } from '@/services/context'
import { objectFormConfig } from '@/products/config'
import Form from '@/objectForm/Form'

const Page = async ({ params }: Params) => {
	const object = await getObject(indexUrl, params?.id)
	return <ObjectsProvider object={object}>
		<Form {...objectFormConfig} />
	</ObjectsProvider>
}

export default Page
