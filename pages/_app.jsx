import NextNProgress from 'nextjs-progressbar'
import {wrapper} from '../src/components/Store'
import 'react-widgets/scss/styles.scss'
import '../src/assets/css/App.scss'
import Layout from '../src/components/layout/layout'

export function App({Component, pageProps}) {
  return <>
    <NextNProgress />
      <Component {...pageProps} />
  </>
}

export default wrapper.withRedux(App)
