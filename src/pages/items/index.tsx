import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from 'components/breadcrumb/breadcrumb'
import {getSearchsServerProps} from 'components/search/get-search-server-props'
import {isEmpty} from 'lodash/fp'
import {GetServerSideProps} from 'next'
import React from 'react'
import {Dict} from 'utils/types'

const EmptyResults: React.FC = () => <div>Not Results</div>

export default function ItemsIndexPage({data}: Dict) {
  const {items, categories: breadcrumbs} = data

  if (isEmpty(items)) return <EmptyResults />

  return (
    <div>
      <Breadcrumb separator={<>&rsaquo;</>}>
        {breadcrumbs.map((xs: string, x: number) => (
          <BreadcrumbItem key={x} isCurrentPage={x === breadcrumbs.length - 1}>
            <BreadcrumbLink href="/">{xs}</BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query}: Dict) => {
  return await getSearchsServerProps(query)
}
