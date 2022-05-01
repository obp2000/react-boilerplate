import cogoToast from 'cogo-toast'

const loading = (isFetching) => {
  if (isFetching) {
    cogoToast.loading('Загрузка...', {hideAfter: 2})
  }
  return null
}

export default loading
