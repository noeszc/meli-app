import {FreeShippingIcon} from 'components/icons'
import {Link} from 'components/link'
import {constant} from 'lodash'
import {compose, isEmpty, juxt, map, mergeAll, pick, prop} from 'lodash/fp'
import * as React from 'react'
import {Dict} from 'utils/types'
import styles from './search-results.module.scss'

const getHref = compose(
  (href) => ({href}),
  (xs: string) => `/items/${xs}`,
  prop('id'),
)

const takeLinkProps = pick(['title'])

const addStyles = constant({className: styles.product__link})

const getLinkProps = compose(
  mergeAll,
  juxt([getHref, takeLinkProps, addStyles]),
)

export const SearchResults: React.FC<Dict> = ({results}) => {
  const renderResults = map(({item}) => {
    const linkProps = getLinkProps(item)
    return (
      <div key={`search-result-${item.id}`} className={styles['product']}>
        <Link {...linkProps}>
          <figure className={styles['product__fig']}>
            <img
              src={item.picture.replace('-I.jpg', '-O.webp')}
              alt={item.title}
              width="180"
              height="180"
            />
          </figure>
        </Link>
        <div className={styles['product__info']}>
          <Link {...linkProps}>
            <span className={styles['product__price']}>
              ${item?.price?.amount}
              {item?.free_shipping && (
                <FreeShippingIcon
                  className={styles['product__shipping-icon']}
                />
              )}
            </span>
          </Link>
          <Link {...linkProps}>
            <h2 className={styles['product__desc']}>{item?.title}</h2>
          </Link>
        </div>
        <div className={styles['product__metas']}>
          <span>{item?.address_state_name}</span>
        </div>
      </div>
    )
  })

  const renderEmptyResults = () => (
    <h3>No hay publicaciones que coincidan con tu búsqueda.</h3>
  )

  return (
    <section className={styles['search-results']}>
      {!isEmpty(results) ? renderResults(results) : renderEmptyResults()}
    </section>
  )
}
