import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { FC } from 'react'
import 'react-widgets/scss/styles.scss'
import '../src/assets/css/App.scss'
import { wrapper } from '../src/components/store'

const App: FC<AppProps> = ({ Component, pageProps }) => <>
  <NextNProgress />
  <Component {...pageProps} />
</>

export default wrapper.withRedux(App)
