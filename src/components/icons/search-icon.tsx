import * as React from 'react'
import {Dict} from 'utils/types'

export const SearchIcon: React.FC<Dict> = ({className}) => (
  <img
    width="24"
    height="24"
    className={className}
    srcSet="/assets/ic_search@2x.png 2x, /assets/ic_search.png 1x"
  />
)
