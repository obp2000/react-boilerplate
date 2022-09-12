import React, { FC } from 'react'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { wrapper } from '../src/components/Store'
import 'react-widgets/scss/styles.scss'
import '../src/assets/css/App.scss'

const App: FC<AppProps> = ({ Component, pageProps }) => <>
  <NextNProgress />
  <Component {...pageProps} />
</>

export default wrapper.withRedux(App)
