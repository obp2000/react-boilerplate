// const { test, expect } = require('@playwright/test')
import { expect, test } from "@/mocks/test"
import cities from '@/mocks/cities.json'
import dict from '@/app/i18n/locales/ru/translation.json'

test.beforeEach(async ({ page }, testInfo) => {
  // testInfo.setTimeout(testInfo.timeout + 30000)
  await page.goto('/ru/customers')
})

test.describe("Customers CRUD functionality", () => {
  test("loads and displays objects", async ({ page }) => {
    // console.log('devices[Desktop Chrome]' , devices['Desktop Chrome'])
    await expect(page).toHaveTitle(/Best&C/)

    const tableHeader = page.getByRole('heading', { name: new RegExp(dict.customers.plural) })
    await expect(tableHeader).toContainText('46')
    await expect(tableHeader).toContainText(dict.customers.plural)

    const table = page.getByRole('table')
    await expect(table).toContainText(/Саратов/)

    const objectRows = page.getByRole('row', { name: dict.customers.singular })
    await expect(objectRows).toHaveCount(8)

    const linksToEdit = page.getByRole('link', { name: dict.edit })
    await expect(linksToEdit).toHaveCount(8)

    const linkToNew = page.getByRole('link', { name: dict.new })
    // await expect(linkToNew).toContainText(dict.new)
    await expect(linkToNew).toHaveCount(1)
    await expect(linkToNew).toHaveAttribute('href', '/ru/customers/new')

    const deleteButtons = page.getByRole('button', { name: dict.delete })
    await expect(deleteButtons).toHaveCount(8)
  })

  test("displays new object form and creates new object", async ({ page }) => {
    // test.slow()
    const linkToNew = page.getByRole('link', { name: dict.new })
    await expect(linkToNew).toHaveAttribute('href', '/ru/customers/new')
    await linkToNew.click()

    const formHeader = page.getByRole('heading',
      { name: `${dict.new} ${dict.customers.singular.toLowerCase()}` })
    await expect(formHeader).toContainText(
      `${dict.new} ${dict.customers.singular.toLowerCase()}`)

    const submitButton = page.getByRole('button', { name: dict.save })
    await expect(submitButton).toBeDisabled()

    const nickInput = page.getByRole('textbox', { name: dict.customer.nick })
    const nameInput = page.getByRole('textbox', { name: dict.customer.name })
    await expect(nickInput).toHaveCount(1)
    await nickInput.focus()
    await nickInput.fill('obp2000')
    await nameInput.focus()
    await expect(nickInput).toHaveValue('obp2000')
    await expect(nickInput).toHaveAttribute('aria-invalid', 'false')
    await expect(submitButton).toBeEnabled()
    await nickInput.fill('')
    await expect(submitButton).toBeDisabled()

    await nameInput.fill('Oleg')
    await expect(nameInput).toHaveValue('Oleg')
    await expect(nameInput).toHaveAttribute('aria-invalid', 'false')
    await expect(submitButton).toBeEnabled()
    await submitButton.click()
    await expect(nickInput).toHaveAttribute('aria-invalid', 'true')
    await expect(submitButton).toBeEnabled()
    await nickInput.fill('obp2000')
    await expect(nameInput).toHaveAttribute('aria-invalid', 'false')

    const addressInput = page.getByRole('textbox', { name: dict.customer.address })
    await addressInput.fill('Main street 15-17')
    await expect(addressInput).toHaveValue('Main street 15-17')
    await expect(addressInput).toHaveAttribute('aria-invalid', 'false')

    const cityCombobox = page.getByRole('combobox', { name: dict.customer.city.city })
    await expect(cityCombobox).toHaveCount(1)
    await expect(cityCombobox).toHaveId('city')
    await expect(cityCombobox).toHaveAttribute('name', 'city')
    await expect(cityCombobox).toHaveAttribute('type', 'text')
    await cityCombobox.click()
    await cityCombobox.type('Ф')
    await expect(cityCombobox).toHaveValue('Ф')
    await cityCombobox.type('у')
    await expect(cityCombobox).toHaveValue('Фу')
    const cityOptions = page.getByRole('option')
    await expect(cityOptions).toHaveCount(18)
    await cityOptions.nth(7).click()
    const cityValue = new RegExp(cities[7].city)
    await expect(cityCombobox).toHaveValue(cityValue)
    const pindexValue = new RegExp(cities[7].pindex)
    await expect(cityCombobox).toHaveValue(pindexValue)
    await expect(submitButton).toBeEnabled()
    await submitButton.click()
    const notification = page.getByRole('alert')
    await expect(notification).toHaveCount(1)
    await expect(notification).toContainText(dict.successfully)
    const tableHeader = page.getByRole('heading', { name: dict.customers.plural })
    await expect(tableHeader).toContainText(dict.customers.plural)
  })

  test("displays existing object form and updates object", async ({ page }) => {
    const linksToEdit = page.getByRole('link', { name: dict.edit })
    await expect(linksToEdit).toHaveCount(8)
    const linkToFirsrCustomer = linksToEdit.nth(6)
    await expect(linkToFirsrCustomer).toHaveAttribute('href', `/ru/customers/${1}`)
    await linkToFirsrCustomer.click()

    const formHeader = page.getByRole('heading', { name: dict.customers.singular })
    await expect(formHeader).toContainText(dict.customers.singular)
    await expect(formHeader).toContainText('1')

    const submitButton = page.getByRole('button', { name: dict.save })
    await expect(submitButton).toBeDisabled()

    const nickInput = page.getByRole('textbox', { name: dict.customer.nick })
    await expect(nickInput).toHaveCount(1)
    await expect(nickInput).toHaveAttribute('aria-invalid', 'false')
    await nickInput.fill('')
    await nickInput.blur()
    await expect(submitButton).toBeEnabled()

    const nameInput = page.getByRole('textbox', { name: dict.customer.name })
    await nameInput.fill('Oleg')
    await expect(nameInput).toHaveValue('Oleg')
    await expect(nameInput).toHaveAttribute('aria-invalid', 'false')
    await expect(submitButton).toBeEnabled()
    await submitButton.click()
    await expect(nickInput).toHaveAttribute('aria-invalid', 'true')
    await expect(submitButton).toBeEnabled()
    await nickInput.fill('obp2000')
    await expect(nameInput).toHaveAttribute('aria-invalid', 'false')

    const addressInput = page.getByRole('textbox', { name: dict.customer.address })
    await addressInput.fill('Main street 15-17')
    await expect(addressInput).toHaveValue('Main street 15-17')
    await expect(addressInput).toHaveAttribute('aria-invalid', 'false')

    const cityCombobox = page.getByRole('combobox', { name: dict.customer.city.city })
    await expect(cityCombobox).toHaveCount(1)
    await expect(cityCombobox).toHaveId('city')
    await expect(cityCombobox).toHaveAttribute('name', 'city')
    await expect(cityCombobox).toHaveAttribute('type', 'text')
    await cityCombobox.click()
    await cityCombobox.type('Ф')
    await expect(cityCombobox).toHaveValue('Ф')
    await cityCombobox.type('у')
    await expect(cityCombobox).toHaveValue('Фу')
    const cityOptions = page.getByRole('option')
    await expect(cityOptions).toHaveCount(18)
    await cityOptions.nth(7).click()
    const cityValue = new RegExp(cities[7].city)
    await expect(cityCombobox).toHaveValue(cityValue)
    const pindexValue = new RegExp(cities[7].pindex)
    await expect(cityCombobox).toHaveValue(pindexValue)
    await expect(submitButton).toBeEnabled()
    await submitButton.click()
    const notification = page.getByRole('alert')
    await expect(notification).toHaveCount(1)
    await expect(notification).toContainText(dict.successfully)
    const tableHeader = page.getByRole('heading', { name: dict.customers.plural })
    await expect(tableHeader).toContainText(dict.customers.plural)
  })

  test("deletes object", async ({ page }) => {
    await page.getByRole('button', { name: dict.delete }).nth(3).click()

    const confirmation = page.getByRole('dialog')
    await expect(confirmation).toBeVisible()
    await confirmation.getByRole('button', { name: dict.no }).click()
    await expect(confirmation).toBeHidden()

    await page.getByRole('button', { name: dict.delete }).nth(3).click()
    await expect(confirmation).toBeVisible()
    await confirmation.getByRole('button', { name: dict.yes }).click()
    await expect(confirmation).toBeHidden()
    const notification = page.getByRole('alert')
    await expect(notification).toHaveCount(1)
    await expect(notification).toContainText(dict.successfully)
  })
})

// pnpm exec playwright open localhost:3000/ru/customers
