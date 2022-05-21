import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
// import {MemoryRouter} from 'react-router-dom'
import {
    render,
    waitFor,
    screen,
    authPreloadedState,
    getAllByRole,
    getByRole,
    findAllByRole,
} from '../mocks/test-utils'
import {
    options,
    commonConsts,
    objects,
    cities,
    handlers
} from '../mocks/handlers'
import App from '../App'

test('loads and displays objects', async () => {
    render(<App />, { preloadedState: authPreloadedState })

    const fetchOptions = jest.spyOn(handlers[0], 'resolver')
    const fetchObjects = jest.spyOn(handlers[2], 'resolver')
    const totalCount = await screen.findByRole('heading', { name: 'Total count' })
    expect(totalCount).toHaveTextContent(objects.totalCount)
    const tableHeader = screen.getByRole('heading', { name: options.name_plural })
    expect(tableHeader).toHaveTextContent(options.name_plural)
    expect(fetchOptions).toHaveBeenCalledTimes(1)
    expect(fetchObjects).toHaveBeenCalledTimes(1)
    const cityName = screen.getByText(new RegExp(objects.results[2].city.city.split(' ')[0]))
    expect(cityName).toBeInTheDocument()
    const objectRows = screen.getAllByRole('row', { name: options.name_singular })
    expect(objectRows).toHaveLength(8)
    const linksToEdit = screen.getAllByRole('link', { name: commonConsts.edit })
    expect(linksToEdit).toHaveLength(8)
    const deleteButtons = screen.getAllByRole('button', { name: commonConsts.delete })
    expect(deleteButtons).toHaveLength(8)
    const linkToNew = screen.getByRole('link', { name: commonConsts.new })
    expect(linkToNew).toHaveTextContent(commonConsts.new)
    expect(linkToNew).toHaveAttribute('href', '/customers/new')
})

test('displays new object form and creates new object', async () => {
    render(<App />, { preloadedState: authPreloadedState })

    const linkToNew = await screen.findByRole('link', { name: commonConsts.new })
    expect(linkToNew).toHaveTextContent(commonConsts.new)
    expect(linkToNew).toHaveAttribute('href', '/customers/new')

    await userEvent.click(linkToNew)
    const formHeader = await screen.findByRole('heading', { name: options.name_singular })
    expect(formHeader).toHaveTextContent(options.name_singular)

    const submitButton = screen.getByRole('button', { name: commonConsts.save })
    expect(submitButton).toBeDisabled()

    const nickInput = screen.getByLabelText(options.nick.label)
    expect(nickInput).toHaveAttribute('placeholder', options.nick.label)
    expect(nickInput).toBeRequired()
    await userEvent.type(nickInput, 'obp2000')
    expect(nickInput).toHaveValue('obp2000')
    expect(nickInput).toBeValid()
    expect(submitButton).not.toBeDisabled()

    await userEvent.clear(nickInput)
    expect(nickInput).toBeInvalid()
    expect(submitButton).toBeDisabled()
    await userEvent.type(nickInput, 'obp2000')

    const nameInput = screen.getByLabelText(options.name.label)
    expect(nameInput).toHaveAttribute('placeholder', options.name.label)
    await userEvent.type(nameInput, 'Oleg')
    expect(nameInput).toHaveValue('Oleg')
    expect(nameInput).toBeValid()

    const addressInput = screen.getByLabelText(options.address.label)
    expect(addressInput).toHaveAttribute('placeholder', options.address.label)
    await userEvent.type(addressInput, 'Main street 15-17')
    expect(addressInput).toHaveValue('Main street 15-17')
    expect(addressInput).toBeValid()

    const cityCombobox = screen.getByRole('combobox', { name: options.city.label })
    expect(cityCombobox).toHaveAttribute('id', 'city_input')
    const cityComboboxInputs = getAllByRole(cityCombobox, 'textbox')
    expect(cityComboboxInputs).toHaveLength(2)
    const cityIdInput = cityComboboxInputs[0]
    expect(cityIdInput).toHaveAttribute('name', 'city')
    const citySearchInput = cityComboboxInputs[1]
    expect(citySearchInput).toHaveClass('rw-dropdownlist-search')

    const searchCities = jest.spyOn(handlers[6], 'resolver')
    await userEvent.click(cityCombobox)
    await userEvent.keyboard('Ф')
    expect(citySearchInput).toHaveValue('Ф')
    expect(cityCombobox).toHaveTextContent(commonConsts.not_found)
    expect(searchCities).toHaveBeenCalledTimes(0)
    await userEvent.keyboard('у')
    expect(citySearchInput).toHaveValue('Фу')
    expect(searchCities).toHaveBeenCalledTimes(1)

    const cityOptions = await findAllByRole(cityCombobox, 'option')
    expect(cityOptions).toHaveLength(18)
    await userEvent.click(cityOptions[7])
    expect(cityIdInput).toHaveValue(cities.results[7].id.toString())
    expect(citySearchInput).toHaveValue('')
    expect(cityCombobox).toHaveTextContent(cities.results[7].city)
    expect(cityCombobox).toHaveTextContent(cities.results[7].pindex)

    const createObject = jest.spyOn(handlers[3], 'resolver')
    await userEvent.click(submitButton)
    const toast = await screen.findByRole('alert')
    expect(createObject).toHaveBeenCalledTimes(1)
    expect(toast).toHaveTextContent(commonConsts.successfully)
    const tableHeader = await screen.findByRole('heading', { name: options.name_plural })
    expect(tableHeader).toHaveTextContent(options.name_plural)
})

test('displays existing object form and updates object', async () => {
    render(<App />, { preloadedState: authPreloadedState })

    const linksToEdit = await screen.findAllByRole('link', { name: commonConsts.edit })
    expect(linksToEdit).toHaveLength(8)
    expect(linksToEdit[2]).toHaveTextContent(commonConsts.edit)
    expect(linksToEdit[2]).toHaveAttribute('href', `/customers/${objects.results[2].id}`)

    const getObject = jest.spyOn(handlers[1], 'resolver')
    // const searchCities = jest.spyOn(handlers[6], 'resolver')
    await userEvent.click(linksToEdit[2])
    const formHeader = await screen.findByRole('heading', { name: options.name_singular })
    expect(getObject).toHaveBeenCalledTimes(1)
    expect(formHeader).toHaveTextContent(options.name_singular)
    expect(formHeader).toHaveTextContent(objects.results[2].id)
    // expect(searchCities).toHaveBeenCalledTimes(1)

    const submitButton = screen.getByRole('button', { name: commonConsts.save })
    expect(submitButton).toBeDisabled()

    const nickInput = screen.getByLabelText(options.nick.label)
    expect(nickInput).toHaveAttribute('placeholder', options.nick.label)
    expect(nickInput).toBeRequired()
    expect(nickInput).toHaveValue(objects.results[2].nick)
    await userEvent.clear(nickInput)
    expect(nickInput).toBeInvalid()
    expect(submitButton).toBeDisabled()
    await userEvent.type(nickInput, 'obp2000')
    expect(nickInput).toHaveValue('obp2000')
    expect(nickInput).toBeValid()
    expect(submitButton).not.toBeDisabled()

    const nameInput = screen.getByLabelText(options.name.label)
    expect(nameInput).toHaveAttribute('placeholder', options.name.label)
    expect(nameInput).toHaveValue(objects.results[2].name)
    await userEvent.clear(nameInput)
    await userEvent.type(nameInput, 'Oleg')
    expect(nameInput).toHaveValue('Oleg')
    expect(nameInput).toBeValid()

    const addressInput = screen.getByLabelText(options.address.label)
    expect(addressInput).toHaveAttribute('placeholder', options.address.label)
    expect(addressInput).toHaveValue(objects.results[2].address)
    await userEvent.clear(addressInput)
    await userEvent.type(addressInput, 'Main street 15-17')
    expect(addressInput).toHaveValue('Main street 15-17')
    expect(addressInput).toBeValid()

    const cityCombobox = screen.getByRole('combobox', { name: options.city.label })
    expect(cityCombobox).toHaveAttribute('id', 'city_input')
    const cityComboboxInputs = getAllByRole(cityCombobox, 'textbox')
    expect(cityComboboxInputs).toHaveLength(2)
    const cityIdInput = cityComboboxInputs[0]
    expect(cityIdInput).toHaveAttribute('name', 'city')
    const citySearchInput = cityComboboxInputs[1]
    expect(citySearchInput).toHaveClass('rw-dropdownlist-search')
    expect(cityCombobox).toHaveTextContent(objects.results[2].city.city)
    expect(cityCombobox).toHaveTextContent(objects.results[2].city.pindex)

    const searchCities = jest.spyOn(handlers[6], 'resolver')
    await userEvent.click(citySearchInput)
    await userEvent.keyboard('Ф')
    expect(citySearchInput).toHaveValue('Ф')
    expect(cityCombobox).toHaveTextContent(commonConsts.not_found)
    expect(searchCities).toHaveBeenCalledTimes(1)
    await userEvent.keyboard('у')
    expect(citySearchInput).toHaveValue('Фу')
    expect(searchCities).toHaveBeenCalledTimes(2)

    const cityOptions = await findAllByRole(cityCombobox, 'option')
    expect(cityOptions).toHaveLength(18)
    await userEvent.click(cityOptions[7])
    expect(cityIdInput).toHaveValue(cities.results[7].id.toString())
    expect(citySearchInput).toHaveValue('')
    expect(cityCombobox).toHaveTextContent(cities.results[7].city)
    expect(cityCombobox).toHaveTextContent(cities.results[7].pindex)

    const updateObject = jest.spyOn(handlers[5], 'resolver')
    await userEvent.click(submitButton)
    const toast = await screen.findByRole('alert')
    expect(updateObject).toHaveBeenCalledTimes(1)
    expect(toast).toHaveTextContent(commonConsts.successfully)
    const tableHeader = await screen.findByRole('heading', { name: options.name_plural })
    expect(tableHeader).toHaveTextContent(options.name_plural)
})

test('deletes object', async () => {
    render(<App />, { preloadedState: authPreloadedState })

    const deleteButtons = await screen.findAllByRole('button', { name: commonConsts.delete })
    expect(deleteButtons).toHaveLength(8)
    await userEvent.click(deleteButtons[3])
    let confirmation = await screen.findByRole('dialog')
    await waitFor(() => expect(confirmation).toHaveClass('show'))
    expect(confirmation).toHaveTextContent(`${commonConsts.delete}?`)
    const cancelDeleteButton = getByRole(confirmation, 'button', { name: commonConsts.no })
    expect(cancelDeleteButton).toHaveTextContent(commonConsts.no)
    await userEvent.click(cancelDeleteButton)
    await waitFor(() => expect(confirmation).not.toHaveClass('show'))

    await userEvent.click(deleteButtons[3])
    confirmation = await screen.findByRole('dialog')
    const proceedDeleteButton = getByRole(confirmation, 'button', { name: commonConsts.yes })
    expect(proceedDeleteButton).toHaveTextContent(commonConsts.yes)

    const deleteObject = jest.spyOn(handlers[4], 'resolver')
    await userEvent.click(proceedDeleteButton)
    expect(deleteObject).toHaveBeenCalledTimes(1)
    const toast = await screen.findByRole('alert')
    expect(toast).toHaveTextContent(commonConsts.successfully)
})