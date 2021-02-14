const ConfirmAction = jest.fn((action, text) => {
    return () => action()
})

export default ConfirmAction 
