import cx from 'clsx'
import * as React from 'react'

import {__DEV__} from 'utils/assertion'
import {Dict} from 'utils/types'
import styles from './input.module.scss'

export const Input = React.forwardRef<HTMLInputElement, Dict>(
  ({className, type = 'text', ...rest}, ref) => {
    const _className = cx(styles.input, className)
    return <input ref={ref} type={type} className={_className} {...rest} />
  },
)

if (__DEV__) {
  Input.displayName = 'Input'
}

// This is used in `input-group.tsx`
Input.id = 'Input'
