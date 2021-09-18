import * as React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from 'components/breadcrumb/breadcrumb'
import {Dict} from 'utils/types'

export const CategoryFilter: React.FC<Dict> = ({categories}) => (
  <Breadcrumb separator={<>&rsaquo;</>}>
    {categories.map((xs: string, x: number) => (
      <BreadcrumbItem key={x} isCurrentPage={x === categories.length - 1}>
        <BreadcrumbLink href="/">{xs}</BreadcrumbLink>
      </BreadcrumbItem>
    ))}
  </Breadcrumb>
)
