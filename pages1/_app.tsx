// import { wrapper } from '@/services/store'
// import '@/styles/globals.scss'
// import type { AppProps } from 'next/app'
// import NextNProgress from 'nextjs-progressbar'
// import { FC } from 'react'
// import 'react-widgets/scss/styles.scss'

// const App: FC<AppProps> = ({ Component, pageProps }) => <>
//   <NextNProgress />
//   <Component {...pageProps} />
// </>

// export default wrapper.withRedux(App)

import { wrapper } from '@/services/store'
import '@/styles/globals.scss'
import { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { FC } from 'react'
import { Provider } from 'react-redux'
import 'react-widgets/scss/styles.scss'

const App: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Provider store={store}>
      <NextNProgress />
      <Component {...props.pageProps} />
    </Provider>
  )
}

export default App
