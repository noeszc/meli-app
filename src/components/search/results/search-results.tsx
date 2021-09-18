import {isEmpty, map} from 'lodash/fp'
import * as React from 'react'
import Image from 'next/image'
import {Dict} from 'utils/types'
import styles from './search-results.module.scss'

export const SearchResults: React.FC<Dict> = ({results}) => {
  const renderResults = map(({item}) => (
    <div key={`search-result-${item.id}`} className={styles['product']}>
      <figure className={styles['product__fig']}>
        <img
          src={item.picture.replace('-I.jpg', '-O.webp')}
          alt={item.title}
          width="180"
          height="180"
        />
      </figure>
      <div className={styles['product__info']}>
        <p className={styles['product__price']}>{`$ ${item.price.amount}`}</p>
        <p className={styles['product__desc']}>{item.title}</p>
      </div>
      <div className={styles['product__metas']}>
        <span>Capital Federal</span>
      </div>
    </div>
  ))

  return (
    <section className={styles['search-results']}>
      {!isEmpty(results) ? renderResults(results) : null}
    </section>
  )
}
