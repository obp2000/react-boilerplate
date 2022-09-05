export const useLinkToNewOrEditObject = ({
  indexUrl,
  object = {},
  commonConsts,
}) => {
  const label = object.id	? commonConsts?.edit : commonConsts?.new
  const pathname = `${indexUrl}${object.id ?? 'new'}`
  const href = {
    pathname,
  }
  return {
    href,
    // as: pathname,
    'aria-labelledby': label,
    label,
  }
}
