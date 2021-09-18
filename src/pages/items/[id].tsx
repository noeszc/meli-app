import {ProductView} from 'components/product'
import {getProductServerProps} from 'components/product/get-product-server-props'
import {GetServerSideProps} from 'next'
import React from 'react'
import {Dict} from 'utils/types'

export default function SingleItemPage({data: product}: Dict) {
  return <ProductView {...product} />
}

export const getServerSideProps: GetServerSideProps = async ({query}: Dict) => {
  return await getProductServerProps(query)
}
