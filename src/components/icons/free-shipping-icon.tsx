import * as React from 'react'
import {Dict} from 'utils/types'

export const FreeShippingIcon: React.FC<Dict> = ({className}) => (
  <img
    width="18"
    height="18"
    className={className}
    srcSet="/assets/ic_shipping@2x.png 2x, /assets/ic_shipping.png 1x"
  />
)
