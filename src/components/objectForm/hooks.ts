export const useTestObjectId = (id: string | string[] | undefined) =>
  (typeof id === 'string') && id.match(/^\d+$/)
