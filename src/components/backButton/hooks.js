import {useOutletContext, useNavigate} from 'react-router-dom'

const emptyObject = {}

export const useBackButton = () => {
  const navigate = useNavigate()
  const {commonConsts: {
  	back
  } = emptyObject} = useOutletContext()
  return {
  	onClick: () => navigate(-1),
  	children: back,
  }
}
