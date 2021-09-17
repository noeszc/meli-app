import {isEmpty, map} from 'lodash/fp'
import * as React from 'react'
import {Dict} from 'utils/types'
import styles from './search-results.module.scss'

export const SearchResults: React.FC<Dict> = ({results}) => {
  const renderResults = map(({item}) => (
    <div key={`search-result-${item.id}`}>{item?.title}</div>
  ))

  return (
    <section className={styles['search-results']}>
      {!isEmpty(results) ? renderResults(results) : null}
    </section>
  )
}
