// @ts-check
// const { test, expect } = require('@playwright/test')
import { expect, test } from "../src/mocks/test"
import {
  options,
  commonConsts,
  objects,
  cities,
} from '../src/mocks/handlers'
// import {devices} from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe.parallel("Customers CRUD functionality", () => {
  test("loads and displays objects", async ({page}) => {
    // console.log('devices[Desktop Chrome]' , devices['Desktop Chrome'])
    await expect(page).toHaveTitle(/Best&C/)

    const heading = page.locator('role=heading[name="Total count"]')
    await expect(heading).toContainText(objects.totalCount.toString())

    const tableHeader =
      page.locator(`role=heading[name="${options.name_plural}"]`)
    await expect(tableHeader).toContainText(options.name_plural)

    const table = page.locator('table')
    const cityText = new RegExp(objects.results[2].city.city.split(' ')[0])
    await expect(table).toContainText(cityText)

    const objectRows = page.locator(`role=row[name="${options.name_singular}"]`)
    await expect(objectRows).toHaveCount(8)

    const linksToEdit = page.locator(`role=link[name="${commonConsts.edit}"]`)
    await expect(linksToEdit).toHaveCount(8)

    const deleteButtons =
      page.locator(`role=button[name="${commonConsts.delete}"]`)
    await expect(deleteButtons).toHaveCount(8)

    const linkToNew = page.locator(`role=link[name="${commonConsts.new}"]`)
    await expect(linkToNew).toContainText(commonConsts.new)
    await expect(linkToNew).toHaveAttribute('href', '/customers/new')
  })

  test("displays new object form and creates new object",
      async ({page}) => {
    const linkToNew = page.locator(`role=link[name="${commonConsts.new}"]`)
    await expect(linkToNew).toContainText(commonConsts.new)
    await expect(linkToNew).toHaveAttribute('href', '/customers/new')
    await linkToNew.click()

    const formHeader =
      page.locator(`role=heading[name="${options.name_singular}"]`)
    await expect(formHeader).toContainText(options.name_singular)

    const submitButton =
      page.locator(`role=button[name="${commonConsts.save}"]`)
    await expect(submitButton).toBeDisabled()

    // const nickInput = page.locator(`text=${options.nick.label}`)
    const nickInput = page.locator('input#nick')
    await expect(nickInput).toHaveAttribute('placeholder', options.nick.label)
    await expect(nickInput).toHaveAttribute('required', '')
    await nickInput.type('obp2000')
    await expect(nickInput).toHaveValue('obp2000')
    await expect(nickInput).toHaveClass(/is-valid/)
    await expect(submitButton).toBeEnabled()
    await nickInput.fill('')
    await expect(nickInput).toHaveClass(/is-invalid/)
    await expect(submitButton).toBeDisabled()
    await nickInput.type('obp2000')

    const nameInput = page.locator('input#name')
    await expect(nameInput).toHaveAttribute('placeholder', options.name.label)
    await nameInput.type('Oleg')
    await expect(nameInput).toHaveValue('Oleg')
    await expect(nameInput).toHaveClass(/is-valid/)

    const addressInput = page.locator('input#address')
    await expect(addressInput).toHaveAttribute('placeholder',
      options.address.label)
    await addressInput.type('Main street 15-17')
    await expect(addressInput).toHaveValue('Main street 15-17')
    await expect(addressInput).toHaveClass(/is-valid/)

    const cityCombobox =
      page.locator(`role=combobox[name="${options.city.label}"]`)
    await expect(cityCombobox).toHaveAttribute('id', 'city_input')
    const cityIdInput = cityCombobox.locator('input[name="city"]')
    const citySearchInput = cityCombobox.locator('input.rw-dropdownlist-search')
    await cityCombobox.click()
    await citySearchInput.type('Ф')
    await expect(citySearchInput).toHaveValue('Ф')
    await expect(cityCombobox).toContainText(commonConsts.not_found)
    await citySearchInput.type('у')
    await expect(citySearchInput).toHaveValue('Фу')
    const cityOptions = cityCombobox.locator('role=option')
    await expect(cityOptions).toHaveCount(18)
    await cityOptions.nth(7).click()
    await expect(cityIdInput).toHaveValue(cities.results[7].id.toString())
    await submitButton.click()
    const toast = page.locator('div.Toastify')
    await expect(toast).toContainText(commonConsts.successfully)
    const tableHeader =
      page.locator(`role=heading[name="${options.name_plural}"]`)
    await expect(tableHeader).toContainText(options.name_plural)
  })

  test("displays existing object form and updates object",
      async ({page}) => {
    const linksToEdit = page.locator(`role=link[name="${commonConsts.edit}"]`)
    await expect(linksToEdit).toHaveCount(8)
    await expect(linksToEdit.nth(2)).toContainText(commonConsts.edit)
    await expect(linksToEdit.nth(2)).toHaveAttribute('href',
      `/customers/${objects.results[2].id}`)

    await linksToEdit.nth(2).click()
    const formHeader =
      page.locator(`role=heading[name="${options.name_singular}"]`)
    await expect(formHeader).toContainText(options.name_singular)
    await expect(formHeader).toContainText(objects.results[2].id.toString())

    const submitButton =
      page.locator(`role=button[name="${commonConsts.save}"]`)
    await expect(submitButton).toBeDisabled()

    const nickInput = page.locator('input#nick')
    await expect(nickInput).toHaveAttribute('placeholder', options.nick.label)
    await expect(nickInput).toHaveAttribute('required', '')
    // await expect(nickInput).toHaveValue(objects.results[2].nick)
    await nickInput.fill('')
    await expect(nickInput).toHaveClass(/is-invalid/)
    await expect(submitButton).toBeDisabled()
    await nickInput.type('obp2000')
    await expect(nickInput).toHaveValue('obp2000')
    await expect(nickInput).toHaveClass(/is-valid/)
    await expect(submitButton).toBeEnabled()

    const nameInput = page.locator('input#name')
    await expect(nameInput).toHaveAttribute('placeholder', options.name.label)
    // await expect(nameInput).toHaveValue(objects.results[2].name)
    await nameInput.fill('Oleg')
    await expect(nameInput).toHaveValue('Oleg')
    await expect(nameInput).toHaveClass(/is-valid/)

    const addressInput = page.locator('input#address')
    await expect(addressInput).toHaveAttribute('placeholder',
      options.address.label)
    // await expect(addressInput).toHaveValue(objects.results[2].address)
    await addressInput.fill('Main street 15-17')
    await expect(addressInput).toHaveValue('Main street 15-17')
    await expect(addressInput).toHaveClass(/is-valid/)

    const cityCombobox =
      page.locator(`role=combobox[name="${options.city.label}"]`)
    await expect(cityCombobox).toHaveAttribute('id', 'city_input')
    const cityIdInput = cityCombobox.locator('input[name="city"]')
    const citySearchInput = cityCombobox.locator('input.rw-dropdownlist-search')
    // await expect(cityCombobox).toContainText(objects.results[2].city.city)
    // await expect(cityCombobox).toContainText(objects.results[2].city.pindex)

    await cityCombobox.click()
    await citySearchInput.type('Ф')
    await expect(citySearchInput).toHaveValue('Ф')
    await expect(cityCombobox).toContainText(commonConsts.not_found)
    await citySearchInput.type('у')
    await expect(citySearchInput).toHaveValue('Фу')

    const cityOptions = cityCombobox.locator('role=option')
    await expect(cityOptions).toHaveCount(18)
    await cityOptions.nth(7).click()
    await expect(cityIdInput).toHaveValue(cities.results[7].id.toString())
    await expect(citySearchInput).toHaveValue('')
    await expect(cityCombobox).toContainText(cities.results[7].city)
    await expect(cityCombobox).toContainText(cities.results[7].pindex)

    await submitButton.click()
    const toast = page.locator('div.Toastify')
    await expect(toast).toContainText(commonConsts.successfully)
    const tableHeader =
      page.locator(`role=heading[name="${options.name_plural}"]`)
    await expect(tableHeader).toContainText(options.name_plural)
  })

  test("deletes object", async ({page}) => {
    const deleteButtons =
      page.locator(`role=button[name="${commonConsts.delete}"]`)
    await expect(deleteButtons).toHaveCount(8)

    await deleteButtons.nth(3).click()
    let confirmation = page.locator('role=dialog')
    await expect(confirmation).toHaveClass(/show/)
    await expect(confirmation).toContainText(`${commonConsts.delete}?`)
    const cancelDeleteButton =
      page.locator(`role=button[name="${commonConsts.no}"]`)
    await expect(cancelDeleteButton).toContainText(commonConsts.no)
    await cancelDeleteButton.click()
    await expect(confirmation).not.toHaveClass(/show/)

    await deleteButtons.nth(3).click()
    confirmation = page.locator('role=dialog')
    const proceedDeleteButton =
      page.locator(`role=button[name="${commonConsts.yes}"]`)
    await expect(proceedDeleteButton).toContainText(commonConsts.yes)
    await proceedDeleteButton.click()
    const toast = page.locator('div.Toastify')
    await expect(toast).toContainText(commonConsts.successfully)
  })
})

// import {getCustomers as getObjects} from '../src/components/customers/apiSlice'
// import {wrappedMakeStore} from '../src/components/Store'

// test('homepage has Playwright in title and get started link linking to the intro page', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);

//   // create a locator
//   const getStarted = page.locator('text=Get Started');

//   // Expect an attribute "to be strictly equal" to the value.
//   await expect(getStarted).toHaveAttribute('href', '/docs/intro');

//   // Click the get started link.
//   await getStarted.click();

//   // Expects the URL to contain intro.
//   await expect(page).toHaveURL(/intro/);
// });

// test.beforeAll(async () => {
//   const {dispatch} = makeStore()
//   const {data} = await dispatch(getObjects.initiate({}))
//   console.log('Before tests', data);
// });
