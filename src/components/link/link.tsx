import * as React from 'react'
import NextLink from 'next/link'
import {useRouter} from 'next/router'
import type {LinkProps as NextLinkProps} from 'next/link'

import cx from 'clsx'
import {WithChildren} from 'utils/types'

export type LinkExtendedProps = {
  variantColor?: 'blue' | 'none'
}

export type LinkProps = LinkExtendedProps & React.HTMLProps<{}>

export type InternalLinkProps = WithChildren<{className?: string}> &
  Omit<NextLinkProps, 'href' | 'children'> &
  Omit<NextLinkProps, 'passHref' | 'as'>

// useLinkArea ::
function useLinkArea(href: NextLinkProps['href']): 'page' | undefined {
  const {pathname} = useRouter()

  if (typeof href === 'string') return pathname === href ? 'page' : undefined
  return pathname === href.pathname ? 'page' : undefined
}

// Link ::
export const Link = React.forwardRef<HTMLAnchorElement, InternalLinkProps>(
  (
    {children, prefetch, replace, scroll, shallow, href, className, ...rest},
    ref,
  ) => {
    const ariaCurrent = useLinkArea(href)

    const linkProps = {
      ...rest,
      'aria-current': ariaCurrent,
    }

    const nextLinkProps: NextLinkProps = {
      href,
      prefetch,
      replace,
      scroll,
      shallow,
    }

    const _className = cx(className)

    return (
      <NextLink {...nextLinkProps} passHref>
        <a {...linkProps} className={_className} ref={ref}>
          {children}
        </a>
      </NextLink>
    )
  },
)

Link.displayName = 'Link'
