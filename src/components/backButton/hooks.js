import {useRouter} from 'next/router'

export const useBackButton = ({commonConsts}) => {
  const router = useRouter()
  return {
  	onClick: () => router.back(),
  	children: commonConsts?.back,
  }
}
