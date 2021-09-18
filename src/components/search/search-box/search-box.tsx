import * as React from 'react'
import {compose, size} from 'lodash/fp'
import {useRouter} from 'next/router'
import {useForm, SubmitHandler} from 'react-hook-form'

import {Input, InputGroup, InputRightElement} from 'components/input'
import {SearchIcon} from 'components/icons'
import styles from './search-box.module.scss'

type FormValues = {
  query: string
}

const inRange = (min: number, max?: number) => (len: number) =>
  len >= min && (typeof max === 'undefined' || len <= max)

const assertLength = compose(inRange(3), size)

export const SearchBox = () => {
  const router = useRouter()
  const {handleSubmit, register} = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = ({query}) => {
    router.push(`/items?search=${query?.split(' ').join('+')}`)
  }

  return (
    <form
      className={styles['search-box']}
      onSubmit={handleSubmit(onSubmit)}
      role="search"
    >
      <InputGroup>
        <Input
          type="search"
          {...register('query', {validate: assertLength})}
          placeholder="Nunca dejes de buscar"
          className={styles['search-box__input']}
        />
        <InputRightElement>
          <button type="submit" className={styles['search-box__button']}>
            <SearchIcon />
          </button>
        </InputRightElement>
      </InputGroup>
    </form>
  )
}
