import {useOutletContext} from 'react-router-dom'

const emptyObject = {}

export const useLinkToNewOrEditObject = (indexUrl, object = {}) => {
	const {
		commonConsts: {
			edit,
			new: textNew,
		} = emptyObject
	} = useOutletContext()
	const label = object.id	? edit : textNew
	return {
		to: `${indexUrl}${object.id ?? 'new'}`,
		state: {object},
		'aria-labelledby': label,
		children: label,
	}
}
