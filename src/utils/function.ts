import {tap, identity} from 'lodash/fp'

import {__DEV__} from './assertion'

// trace :: (* -> a) -> (* -> a)
export const trace = (label: string) =>
  __DEV__ ? tap((x: any) => console.log(label, x)) : identity
