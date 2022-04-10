import React from 'react'
// import { rest } from 'msw'
// import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// import { Provider } from 'react-redux'
// import { ConnectedRouter } from 'connected-react-router'
// import configureStore from '../../../Store'
// import Customers from '../Customers'
import App from '../App'

// console.log('env ' , process.env.NODE_ENV)




// const server = setupServer(
//     rest.options('http://127.0.0.1:8000/api/customers/', (req, res, ctx) => {
//         return res(ctx.json(options))
//     }),
//     rest.get('http://127.0.0.1:8000/api/customers/', (req, res, ctx) => {
//         return res(ctx.json({sss: 'ddddd'}))
//     }),
// )

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

// test('handlers server error', async () => {
//   server.use(
//     // override the initial "GET /greeting" request handler
//     // to return a 500 Server Error
//     rest.get('/greeting', (req, res, ctx) => {
//       return res(ctx.status(500))
//     }),
//   )

//   // ...
// })


test('loads and displays objects', async () => {
    // async () => {
        const { debug } = render(<App />)
        debug()
        // await waitFor(() => screen.getByRole('button', { name: 'auth' }))
        // expect(screen.getByRole('button', { name: 'auth' })).toHaveTextContent('ssssss')
    // }
    // await waitFor(() => render(<App />))
    // await waitFor(() => screen.getByRole('button', { name: 'auth' }))
    // expect(screen.getByRole('button', { name: 'auth' })).toHaveTextContent('ssssss')


    // render(<Provider store={store}>
    //           <ConnectedRouter history={history}>
    //               <Customers />
    //           </ConnectedRouter>
    //       </Provider>

    //  )

    // fireEvent.click(screen.getByText('Load Greeting'))

    // await waitFor(() => screen.getByRole('heading'))

    // expect(screen.getByRole('heading')).toHaveTextContent('hello there')
    // expect(screen.getByRole('button')).toBeDisabled()
})