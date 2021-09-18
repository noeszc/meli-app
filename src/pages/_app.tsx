import {NextComponentType, NextPageContext} from 'next'
import type {AppProps} from 'next/app'
import {NextRouter} from 'next/dist/client/router'

import 'theme/global.scss'
import {Layout} from 'components/layout'

export interface AppRenderProps {
  pageProps: object
  err?: Error
  Component?: NextComponentType<NextPageContext, AppRenderProps, object>
  router?: NextRouter
}

function MyApp({Component, pageProps}: AppRenderProps) {
  const AppComponent = Component as any

  const getLayout =
    AppComponent.getLayout ||
    ((Page: any) => (
      <Layout>
        <Page {...pageProps} />
      </Layout>
    ))

  return <>{getLayout(Component, pageProps)}</>
}

export default MyApp
