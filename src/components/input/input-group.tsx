import cx from 'clsx'
import * as React from 'react'

import {__DEV__} from 'utils/assertion'
import {getValidChildren} from 'utils/react-helpers'
import {Dict} from 'utils/types'
import styles from './input.module.scss'

export const InputGroup = React.forwardRef<HTMLDivElement, Dict>(
  (props, ref) => {
    const {className, children, ...rest} = props
    const validChildren = getValidChildren(children)

    const _className = cx(styles.input__group, className)

    const clones = validChildren.map((child: any) => {
      const theming = {
        size: props.size || child.props?.size,
        variant: props.variant || child.props?.variant,
      }

      return child.type.id !== 'Input'
        ? React.cloneElement(child, theming)
        : React.cloneElement(child, {
            ...theming,
          })
    })

    return (
      <div className={_className} ref={ref} {...rest}>
        {clones}
      </div>
    )
  },
)

if (__DEV__) {
  InputGroup.displayName = 'InputGroup'
}
