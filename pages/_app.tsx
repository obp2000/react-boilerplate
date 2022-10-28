import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { FC } from 'react'
import 'react-widgets/scss/styles.scss'
import { wrapper } from '../services/store'
import '../styles/globals.scss'

const App: FC<AppProps> = ({ Component, pageProps }) => <>
  <NextNProgress />
  <Component {...pageProps} />
</>

export default wrapper.withRedux(App)
