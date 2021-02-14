import ChangeAction from '../ChangeAction'

describe('change action', () => {
  test('should call action', () => {
    const action = jest.fn()
    const value = 'test'
    ChangeAction(action)({}, value)
    expect(action).toHaveBeenCalledTimes(1)
    expect(action).toBeCalledWith(value)
  })
})