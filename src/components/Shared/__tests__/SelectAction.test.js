import SelectAction from '../SelectAction'

describe('select action', () => {
  test('should call action if obj is valid', () => {
    const action = jest.fn()
    const key = 'key'
    const obj = {key: 'test'}
    SelectAction(action, key)(obj)
    expect(action).toHaveBeenCalledTimes(1)
    expect(action).toBeCalledWith(obj[key])
  })
  test('should not call action if obj is invalid', () => {
    const action = jest.fn()
    const key = 'key'
    const obj = {id: 'test'}
    SelectAction(action, key)(obj)
    expect(action).not.toHaveBeenCalled()
  })
})