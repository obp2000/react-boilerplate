const { request } = require('@playwright/test');

module.exports = async () => {
  const requestContext = await request.newContext();
  await requestContext.post('http://127.0.0.1:8000/api/login/', {
    form: {
      'username': 'testUser',
      'password': 'proverka123'
    }
  });
  // Save signed-in state to 'storageState.json'.
  await requestContext.storageState({ path: 'storageState.json' });
  await requestContext.dispose();
}
