// const { test, expect } = require('@playwright/test')
import { expect, test } from "@/mocks/test"
import cities from '@/mocks/cities.json'
import dict from '@/app/i18n/locales/ru/translation.json'

test.beforeEach(async ({ page }) => {
  await page.goto('customers')
})

test.describe("Customers CRUD functionality", () => {
  test("loads and displays objects", async ({ page }) => {
    // console.log('devices[Desktop Chrome]' , devices['Desktop Chrome'])
    await expect(page).toHaveTitle(/Best&C/)

    const tableHeader = page.getByRole('heading', { name: new RegExp(dict.customers.plural) })
    await expect(tableHeader).toContainText('45')
    await expect(tableHeader).toContainText(dict.customers.plural)

    const table = page.getByRole('table')
    await expect(table).toContainText(/Саратов/)

    const objectRows = page.getByRole('row', { name: dict.customers.singular })
    await expect(objectRows).toHaveCount(8)

    const linksToEdit = page.getByRole('link', { name: dict.edit })
    await expect(linksToEdit).toHaveCount(8)

    const linkToNew = page.getByRole('link', { name: dict.new })
    await expect(linkToNew).toContainText(dict.new)
    await expect(linkToNew).toHaveAttribute('href', '/ru/customers/new')

    const deleteButtons = page.getByRole('img', { name: dict.delete })
    await expect(deleteButtons).toHaveCount(8)
  })

  test("displays new object form and creates new object", async ({ page }) => {
    const linkToNew = page.getByRole('link', { name: dict.new })
    await expect(linkToNew).toHaveAttribute('href', '/ru/customers/new')
    await linkToNew.click()

    const formHeader = page.getByRole('heading', { name: dict.customers.singular })
    await expect(formHeader).toContainText(
      `${dict.new} ${dict.customers.singular.toLowerCase()} `)

    const submitButton = page.getByRole('button', { name: dict.save })
    await expect(submitButton).toBeDisabled()

    // const nickInput = page.locator(`text=${options.nick.label}`)
    // const nickInput = page.locator('input#nick')
    const invalidClass = new RegExp('text-red')
    const nickInput = page.getByRole('textbox', { name: dict.customer.nick })
    await expect(nickInput).toHaveCount(1)
    await expect(nickInput).not.toHaveClass(invalidClass)
    const nameInput = page.getByRole('textbox', { name: dict.customer.name })
    const cityCombobox = page.getByRole('combobox', { name: dict.customer.city.city })
    await expect(cityCombobox).toHaveCount(1)
    const addressInput = page.getByRole('textbox', { name: dict.customer.address })

    await expect(nickInput).toHaveAttribute('placeholder', dict.customer.nick)
    await expect(nickInput).toHaveAttribute('required', '')
    await nickInput.type('obp2000')
    await expect(nickInput).toHaveValue('obp2000')
    await nameInput.focus()

    await expect(submitButton).toBeDisabled()
    await nickInput.fill('')
    await nameInput.focus()
    await expect(nickInput).toHaveClass(invalidClass)
    await expect(submitButton).toBeDisabled()
    await nickInput.type('obp2000')

    await expect(nameInput).toHaveAttribute('placeholder', dict.customer.name)
    await nameInput.type('Oleg')
    await expect(nameInput).toHaveValue('Oleg')
    await nickInput.focus()
    await expect(nameInput).not.toHaveClass(invalidClass)

    await expect(addressInput).toHaveAttribute('placeholder', dict.customer.address)
    await addressInput.type('Main street 15-17')
    await expect(addressInput).toHaveValue('Main street 15-17')
    await nickInput.focus()
    await expect(addressInput).not.toHaveClass(invalidClass)

    await expect(cityCombobox).toHaveAttribute('id', 'city_input')
    const cityIdInput = cityCombobox.locator('input[name="city"]')
    const citySearchInput = cityCombobox.locator('input.rw-dropdownlist-search')
    await cityCombobox.click()
    await citySearchInput.type('Ф')
    await expect(citySearchInput).toHaveValue('Ф')
    await expect(cityCombobox).toContainText(dict.not_found)
    await citySearchInput.type('у')
    await expect(citySearchInput).toHaveValue('Фу')
    const cityOptions = cityCombobox.getByRole('option')
    await expect(cityOptions).toHaveCount(18)
    await cityOptions.nth(7).click()
    await expect(cityIdInput).toHaveValue(cities[7].id.toString())
    await expect(submitButton).toBeEnabled()
    await submitButton.click()
    await expect(page.getByRole('alert')).toContainText(dict.successfully)
    const tableHeader = page.getByRole('heading', { name: dict.customers.plural })
    await expect(tableHeader).toContainText(dict.customers.plural)
  })

  test("displays existing object form and updates object", async ({ page }) => {
    const linksToEdit = page.getByRole('link', { name: dict.edit })
    await expect(linksToEdit).toHaveCount(8)
    await expect(linksToEdit.nth(2)).toHaveAttribute('href', `/ru/customers/${1}`)
    await linksToEdit.nth(2).click()

    const formHeader = page.getByRole('heading', { name: dict.customers.singular })
    await expect(formHeader).toContainText(dict.customers.singular)
    // await expect(formHeader).toContainText(objects.results[2].id.toString())
    await expect(formHeader).toContainText('1')

    const submitButton = page.getByRole('button', { name: dict.save })
    await expect(submitButton).toBeDisabled()

    const invalidClass = new RegExp('text-red')
    const nickInput = page.getByRole('textbox', { name: dict.customer.nick })
    await expect(nickInput).toHaveCount(1)
    await expect(nickInput).not.toHaveClass(invalidClass)
    await expect(nickInput).toHaveAttribute('placeholder', dict.customer.nick)
    await expect(nickInput).toHaveAttribute('required', '')
    const nameInput = page.getByRole('textbox', { name: dict.customer.name })
    const cityCombobox = page.getByRole('combobox', { name: dict.customer.city.city })
    await expect(cityCombobox).toHaveCount(1)
    const addressInput = page.getByRole('textbox', { name: dict.customer.address })

    await nickInput.fill('')
    await nameInput.focus()
    await expect(nickInput).toHaveClass(invalidClass)

    await expect(submitButton).toBeDisabled()
    await nickInput.type('obp2000')
    await expect(nickInput).toHaveValue('obp2000')
    await nameInput.focus()
    await expect(nickInput).not.toHaveClass(invalidClass)
    await expect(submitButton).toBeEnabled()

    await expect(nameInput).toHaveAttribute('placeholder', dict.customer.name)
    // await expect(nameInput).toHaveValue(objects.results[2].name)
    await nameInput.fill('Oleg')
    await expect(nameInput).toHaveValue('Oleg')
    await nickInput.focus()
    await expect(nameInput).not.toHaveClass(invalidClass)

    await expect(addressInput).toHaveAttribute('placeholder', dict.customer.address)
    // await expect(addressInput).toHaveValue(objects.results[2].address)
    await addressInput.fill('Main street 15-17')
    await expect(addressInput).toHaveValue('Main street 15-17')
    await nameInput.focus()
    await expect(addressInput).not.toHaveClass(invalidClass)

    await expect(cityCombobox).toHaveAttribute('id', 'city_input')
    const cityIdInput = cityCombobox.locator('input[name="city"]')
    const citySearchInput = cityCombobox.locator('input.rw-dropdownlist-search')

    // await expect(cityCombobox).toContainText(objects.results[2].city.city)
    // await expect(cityCombobox).toContainText(objects.results[2].city.pindex)
    await cityCombobox.click()
    await citySearchInput.type('Ф')
    await expect(citySearchInput).toHaveValue('Ф')
    await expect(cityCombobox).toContainText(dict.not_found)
    await citySearchInput.type('у')
    await expect(citySearchInput).toHaveValue('Фу')
    const cityOptions = cityCombobox.getByRole('option')
    await expect(cityOptions).toHaveCount(18)
    await cityOptions.nth(7).click()
    await expect(cityIdInput).toHaveValue(cities[7].id.toString())
    await expect(citySearchInput).toHaveValue('')
    await expect(cityCombobox).toContainText(cities[7].city)
    await expect(cityCombobox).toContainText(cities[7].pindex)
    await expect(submitButton).toBeEnabled()
    await submitButton.click()
    await expect(page.getByRole('alert')).toContainText(dict.successfully)
    const tableHeader = page.getByRole('heading', { name: dict.customers.plural })
    await expect(tableHeader).toContainText(dict.customers.plural)
  })

  test("deletes object", async ({ page }) => {
    await page.getByRole('img', { name: dict.delete }).nth(3).click({ timeout: 3000 })

    let confirmation = page.getByTestId('modal')
    await expect(confirmation).toBeVisible()
    await confirmation.getByRole('button', { name: dict.no }).click()
    await expect(confirmation).toBeHidden()

    await page.getByRole('img', { name: dict.delete }).nth(3).click()
    confirmation = page.getByTestId('modal')
    await expect(confirmation).toBeVisible()
    await confirmation.getByRole('button', { name: dict.yes }).click()
    await expect(confirmation).toBeHidden()
    await expect(page.getByRole('alert')).toContainText(dict.successfully)
  })
})
