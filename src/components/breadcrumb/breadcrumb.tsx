import _ from 'lodash/fp'
import * as React from 'react'
import cx from 'clsx'

import {Link, LinkProps} from 'components/link'
import {getValidChildren} from 'utils/react-helpers'
import {__DEV__} from 'utils/assertion'
import {Dict} from 'utils/types'
import styles from './breadcrumb.module.scss'

export const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, Dict>(
  ({className, ...props}, ref) => {
    const _className = cx(styles.breadcrumb__separator, className)

    return (
      <span
        ref={ref}
        role="presentation"
        className={_className}
        {...props}
      ></span>
    )
  },
)

if (__DEV__) {
  BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'
}

export interface BreadcrumbLinkProps extends LinkProps {
  isCurrentPage?: boolean
}

export const BreadcrumbLink = React.forwardRef<
  HTMLElement,
  BreadcrumbLinkProps
>((props, ref) => {
  const {isCurrentPage, className, ...rest} = props
  const sharedProps = {
    ref,
    className: cx(styles.breadcrumb__link, className),
    ...rest,
  }

  if (isCurrentPage) {
    return <span aria-current="page" {...sharedProps}></span>
  }

  return <Link {...sharedProps}></Link>
})

if (__DEV__) {
  BreadcrumbLink.displayName = 'BreadcrumbLink'
}

interface BreadcrumbItemOptions extends BreadcrumbOptions {
  isCurrentPage?: boolean
  isLastChild?: boolean
}

export interface BreadcrumbItemProps extends BreadcrumbItemOptions, Dict {}

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  isCurrentPage,
  separator,
  isLastChild,
  spacing,
  children,
  className,
  ...rest
}) => {
  const validChildren = getValidChildren(children)
  const clones = validChildren.map((child) => {
    return _.cond([
      [
        _.compose(_.isEqual(BreadcrumbLink), _.prop('type')),
        _.constant(React.cloneElement(child, {isCurrentPage})),
      ],
      [
        _.compose(_.isEqual(BreadcrumbSeparator), _.prop('type')),
        _.constant(
          React.cloneElement(child, {
            spacing,
            children: child.props.children || separator,
          }),
        ),
      ],
      [_.stubTrue, _.identity],
    ])(child)
  })

  const _className = cx(
    styles.breadcrumb__item,
    isCurrentPage && styles['breadcrumb__item--current'],
    className,
  )

  return (
    <li {...rest} className={_className}>
      {clones}
      {!isLastChild && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
    </li>
  )
}

export interface BreadcrumbOptions {
  /**
   * The visual separator between each breadcrumb item
   * @type string | React.ReactElement
   */
  separator?: string | React.ReactElement
  /**
   * The left and right margin applied to the separator talwind class
   * @type string
   */
  spacing?: string
}

export interface BreadcrumbProps extends BreadcrumbOptions, Dict {}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (props, ref) => {
    const {children, spacing = '', separator = '/', className, ...rest} = props

    const validChildren = getValidChildren(children)
    const count = validChildren.length

    const clones = validChildren.map((child, index) =>
      React.cloneElement(child, {
        separator,
        spacing,
        isLastChild: count === index + 1,
      }),
    )

    const _className = cx(styles.breadcrumb, className)

    return (
      <nav ref={ref} aria-label="breadcrumb" className={_className} {...rest}>
        <ol className={styles.breadcrumb__list}>{clones}</ol>
      </nav>
    )
  },
)

if (__DEV__) {
  Breadcrumb.displayName = 'Breadcrumb'
}
