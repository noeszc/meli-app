import * as React from 'react'

import {Link} from 'components/link'
import {SearchBox} from 'components/search'

import styles from './layout.module.scss'

export const Header: React.FC = () => {
  return (
    <div className={styles.header} role="banner">
      <div className={styles.header__wrap}>
        <Link href="/" className={styles.header__logo}>
          Mercado Libre
        </Link>
        <SearchBox />
      </div>
    </div>
  )
}

export const Main: React.FC = ({children}) => {
  return (
    <main className={styles.main} role="main">
      {children}
    </main>
  )
}

export const Layout: React.FC = ({children}) => {
  return (
    <>
      <Header></Header>
      <Main>{children}</Main>
    </>
  )
}
