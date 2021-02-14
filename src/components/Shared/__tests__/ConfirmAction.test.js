import ConfirmAction from '../ConfirmAction'

describe('confirm action', () => {
  test('should call confirm dialogue', () => {
    const action = jest.fn()
    global.confirm = jest.fn(() => true)
    const confirmMessage = 'Удалить?'
    ConfirmAction(action, confirmMessage)({
      preventDefault: () => null
    })
    expect(confirm).toHaveBeenCalledTimes(1)
    expect(confirm).toHaveBeenCalledWith(confirmMessage)
  })
  test('should call action if confirm', () => {
    const action = jest.fn()
    global.confirm = jest.fn(() => true)
    const confirmMessage = 'Удалить?'
    ConfirmAction(action, confirmMessage)({
      preventDefault: () => null
    })
    expect(action).toHaveBeenCalledTimes(1)
  })
  test('should not call action if not confirm', () => {
    const action = jest.fn()
    global.confirm = jest.fn(() => false)
    const confirmMessage = 'Удалить?'
    ConfirmAction(action, confirmMessage)({
      preventDefault: () => null
    })
    expect(action).not.toHaveBeenCalled()
  })
})