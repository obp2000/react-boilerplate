// import {useSelector} from 'react-redux'
// import {selectAuth} from '../auth/selectors'

export const useLinkToNewOrEditObject = ({
  indexUrl,
  object = {},
  commonConsts,
}) => {
  // const {isAuthenticated} = useSelector(selectAuth)
  const label = object.id	? commonConsts?.edit : commonConsts?.new
  return {
    // isAuthenticated,
    'href': `${indexUrl}${object.id ?? 'new'}`,
    // state: {object},
    'aria-labelledby': label,
    label,
  }
}

// export const useLinkToNewObject = ({
//   indexUrl,
//   commonConsts: {
//     new: textNew
//   } = {},
// }) => {
//   const {isAuthenticated} = useSelector(selectAuth)
//   const label = textNew
//   return {
//     isAuthenticated,
//     'href': 'new',
//     // state: {object},
//     'aria-labelledby': label,
//     label,
//   }
// }
