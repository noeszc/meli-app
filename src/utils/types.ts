import type {ReactNode} from 'react'

export type WithChildren<Props = {}> = Props & {
  children?: ReactNode
}

export type Dict<T = any> = Record<string, T>
