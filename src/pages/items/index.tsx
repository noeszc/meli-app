import {getSearchsServerProps} from 'components/search/get-search-server-props'
import {isEmpty} from 'lodash/fp'
import {GetServerSideProps} from 'next'
import React from 'react'
import request from 'utils/request'
import {Dict} from 'utils/types'

const EmptyResults: React.FC = () => <div>Not Results</div>

export default function ItemsIndexPage({data}: Dict) {
  const {items, categories} = data
  console.log(items)
  if (isEmpty(items)) return <EmptyResults />
  return <>ItemsIndexPage</>
}

export const getServerSideProps: GetServerSideProps = async ({query}: Dict) => {
  return await getSearchsServerProps(query)
}
