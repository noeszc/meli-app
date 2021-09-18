import {compose, prop} from 'lodash/fp'
import * as React from 'react'
import {Dict} from 'utils/types'
import styles from './product-view.module.scss'
import simplur from 'simplur'

// prettier-ignore
// breakLines :: String -> String
const breakLines = (xs: string) =>
  xs.replace(/(?:\r\n|\r|\n)/g, '<br>')

// prettier-ignore
// getDescription :: Object -> String
const getDescription = compose(
  breakLines, 
  prop('description.plain_text')
)

// prettier-ignore
// prettySoldQty :: Number -> String
const prettySoldQty = (xs: number) =>
  simplur`${xs} vendid[o|os]`

const prettyCondition = (xs: string) => {
  const values: Dict = {
    new: 'Nuevo',
    used: 'Usado',
  }
  return values?.[xs]
}

export const ProductView = ({item}: Dict) => {
  return (
    <div className={styles['single']}>
      <div className={styles['single__detail']}>
        <figure className={styles['single__fig']}>
          <img src={item?.picture} alt={item?.title} width="680" />
        </figure>
        <div className={styles['single__info']}>
          <header className={styles['single__head']}>
            <div className={styles['single__metas']}>
              <span>
                {prettyCondition(item?.condition)} -{' '}
                <span>{prettySoldQty(item?.sold_quantity)}</span>
              </span>
            </div>
            <h1 className={styles['single__title']}>{item?.title}</h1>
          </header>
          <p className={styles['single__price']}>$ {item?.price?.amount}</p>
          <button className={styles['single__btn']}>Comprar</button>
        </div>
      </div>
      <div className={styles['single__desc']}>
        <header className={styles['single__desc-head']}>
          <h2 className={styles['single__desc-title']}>
            Descripción del producto
          </h2>
        </header>
        <p
          dangerouslySetInnerHTML={{__html: getDescription(item)}}
          className={styles['single__desc-text']}
        ></p>
      </div>
    </div>
  )
}
