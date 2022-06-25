import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Loader from 'react-loader'
import {Form} from 'react-final-form'
import {toastSuccess, toastError} from './Toast'
import {
  getObjectsDataSelector,
  getObjectByIdSelector,
} from '../../services/entityAdapter'
import NotFound from '../NotFound'

const ObjectForm = ({
  id,
  indexUrl: url,
  redirectUrl,
  decorators,
  mutators = {},
  ObjectFormRender,
  validate,
  formInitialValues,
  optionsTrigger,
  commonConsts,
  options,
  getObjects,
  useGetObjectQuery,
  useLazyGetObjectQuery,
  useCreateObjectMutation,
  useUpdateObjectMutation,
}) => {
  useEffect(() => {
    optionsTrigger(url, true)
  }, [url])
  const location = useLocation()
  const tableArgs = location.state?.tableArgs
  let object
  let objectStatus = {}
  let useMutation
  // let [objectTrigger, {data: object, ...objectStatus}] =
  //   useLazyGetObjectQuery()
  // const isNewObject = id == 'new'
  if (id == 'new') {
    objectStatus.isSuccess = true
    useMutation = useCreateObjectMutation
  } else {
    useMutation = useUpdateObjectMutation
    if (tableArgs || tableArgs == '') {
      // const {selectObjectById} = getObjectsSelectors(tableArgs)
      // const {selectObjectById} = getObjectsSelectors({url, params: ''})
      // object = useSelector(state => selectObjectById(state, id))

      const selectObjectsResult = getObjects.select(tableArgs)
      const selectObjectsData = getObjectsDataSelector(selectObjectsResult)
      const selectObjectById = getObjectByIdSelector(selectObjectsData, id)
      object = useSelector(selectObjectById)
    }
    if (object) {
      console.log('object1 ', object)
      objectStatus.isSuccess = true
    } else {
      ;({ data: object = {},
          ...objectStatus
        } = useGetObjectQuery({url, id: parseInt(id)})
      )
      console.log('object2 ', object)
      // objectTrigger({id: parseInt(id)})
    }
  }
  const [createOrUpdateObject, createOrUpdateStatus] = useMutation()
  const busy = objectStatus.isFetching || createOrUpdateStatus.isLoading
  const navigate = useNavigate()
  if (!busy) {
    if (createOrUpdateStatus.isSuccess) {
      toastSuccess(commonConsts?.successfully)
      navigate(tableArgs ? -1 : url)
    }
    if (createOrUpdateStatus.isError) {
      toastError(createOrUpdateStatus?.error.detail)
    }
    if (objectStatus.isError) {return <NotFound />}
  }
  // console.log('tableArgs form ', tableArgs)
  return <Loader loaded={!busy}>
    <Form name='objectForm'
      validate={validate(commonConsts?.error_messages)}
      onSubmit={(values) => createOrUpdateObject({...values, tableArgs})}
      initialValues={formInitialValues(object, options)}
      decorators={decorators}
      mutators={mutators}
      render={ObjectFormRender}
      {...{commonConsts, options}}
    />
  </Loader>
}

ObjectForm.propTypes = {
  id: PropTypes.string,
  indexUrl: PropTypes.string,
  redirectUrl: PropTypes.string,
  decorators: PropTypes.array,
  mutators: PropTypes.object,
  ObjectFormRender: PropTypes.func,
  validate: PropTypes.func,
  formInitialValues: PropTypes.func,
  optionsTrigger: PropTypes.func,
  commonConsts: PropTypes.object,
  options: PropTypes.object,
  getObjects: PropTypes.func,
  useGetObjectQuery: PropTypes.func,
  useLazyGetObjectQuery: PropTypes.func,
  useCreateObjectMutation: PropTypes.func,
  useUpdateObjectMutation: PropTypes.func,
}

export default ObjectForm
