// import PropTypes from 'prop-types'
// import React from 'react'
// import Loader from 'react-loader'
// import ObjectForm from './ObjectForm'
// import NotFound from '../NotFound'
// import {useDigitId, useObjectFromLocationState} from './hooks'

// const emptyObject = {}

// const ValidateId = ({useObjectForm, useGetObjectQuery}) => {
//   const id = useDigitId()
//   if (!id) {return <NotFound />}
//   const object = useObjectFromLocationState()
//   if (object) {return <ObjectForm {...{object, useObjectForm}} />}
//   const {
//     data = emptyObject,
//     isLoading: isLoadingObject,
//     isError: isErrorGettingObject,
//   } = useGetObjectQuery({id})
//   if (isErrorGettingObject) {return <NotFound />}
//   return <Loader loaded={!isLoadingObject}>
//       <ObjectForm {...{object: data, useObjectForm}} />
//     </Loader>
// }

// ValidateId.propTypes = {
//   useObjectForm: PropTypes.func,
//   useGetObjectQuery: PropTypes.func,
// }

// export default ValidateId
