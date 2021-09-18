import {CategoryFilter} from 'components/product'
import {SearchResults} from 'components/search'
import {getSearchsServerProps} from 'components/search/get-search-server-props'
import {take} from 'lodash/fp'
import {GetServerSideProps} from 'next'
import React from 'react'
import {Dict} from 'utils/types'

export default function ItemsIndexPage({data}: Dict) {
  const {items: results, categories} = data

  return (
    <>
      <CategoryFilter categories={take(5, categories)} />
      <SearchResults results={results} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query}: Dict) => {
  return await getSearchsServerProps(query)
}
