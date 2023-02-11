// import { request } from '@playwright/test'

// async function globalSetup() {
//   const requestContext = await request.newContext()
//   const state1 = await requestContext.post('http://localhost:3000/api/auth/login', {
//     data: {
//       'username': 'testUser1',
//       'password': 'proverka123'
//     }
//   })
//   // Save signed-in state to 'storageState.json'.
//   const state2 = await requestContext.storageState({ path: 'storageState.json' })
//   console.log('state1 ', state1)
//   await requestContext.dispose()
// }

// async function globalSetup() {
//   const requestContext = await request.newContext();
//   await requestContext.post('https://github.com/login', {
//     form: {
//       'user': 'user',
//       'password': 'password'
//     }
//   });
//   // Save signed-in state to 'storageState.json'.
//   await requestContext.storageState({ path: 'storageState.json' });
//   await requestContext.dispose();
// }

import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/ru/customers');
  // await page.getByLabel('Username or email address').fill('username');
  // await page.getByLabel('Password').fill('password');
  // await page.getByRole('button', { name: 'Sign in' }).click();
  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: 'storageState1.json' });
  await browser.close();
}

export default globalSetup;
