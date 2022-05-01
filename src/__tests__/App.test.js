import React from 'react'
import { render, fireEvent, waitFor, screen } from '../mocks/test-utils'
import '@testing-library/jest-dom'
import ObjectsTable from '../components/Shared/ObjectsTable'
import { config as customersConfig } from '../components/redux/Customers'

test('loads and displays objects', async () => {
    render(<ObjectsTable {...customersConfig} />)
    expect(await screen.findByText(/Александровка/i)).toBeInTheDocument()

})