import {useRouter} from 'next/router'
import React from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'

type FormValues = {
  query: string
}

export const SearchBar = () => {
  const router = useRouter()
  const {handleSubmit, register} = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = ({query}) => {
    router.push(`/items?search=${query?.split(' ').join('+')}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} role="search">
      <div>
        <input
          type="search"
          {...register('query')}
          placeholder="Nunca dejes de buscar"
        />
        <button type="submit">Search</button>
      </div>
    </form>
  )
}
