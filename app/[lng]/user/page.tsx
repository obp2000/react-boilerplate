import { UserPage } from '@/app/user/UserPage'

export default async function Page(
  props: { params: { lng: string } }
) {
  return <UserPage {...props} />
}
