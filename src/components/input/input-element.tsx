import cx from 'clsx'
import * as React from 'react'

import {__DEV__} from 'utils/assertion'
import {Dict} from 'utils/types'
import styles from './input.module.scss'

const InputElement = React.forwardRef<HTMLDivElement, Dict>(
  ({className, ...rest}, ref) => {
    const _className = cx(styles.input__element, className)
    return <div ref={ref} className={_className} {...rest}></div>
  },
)

if (__DEV__) {
  InputElement.displayName = 'InputElement'
}

export const InputRightElement = React.forwardRef<HTMLDivElement, Dict>(
  (props, ref) => {
    const {className, ...rest} = props
    const _className = cx(styles['input__element--right'], className)

    return (
      <InputElement
        ref={ref}
        placement="right"
        className={_className}
        {...rest}
      />
    )
  },
)

// This is used in `input-group.tsx`
InputRightElement.id = 'InputRightElement'

if (__DEV__) {
  InputRightElement.displayName = 'InputRightElement'
}
