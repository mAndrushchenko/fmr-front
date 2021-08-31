import { VFC, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBooksAction, shopSelector } from 'src/store/slices/shopSlice'
import type { TAppDispatch } from 'src/types/store'
import { styles } from './styles'
import { Card } from '../Card'
import { Filters } from '../Filters'

export const Library: VFC = () => {
  const classes = styles()
  const dispatch = useDispatch<TAppDispatch>()
  const { books, filters } = useSelector(shopSelector)
  const bookList = useMemo(() => books, [ books ])

  useEffect(() => {
    if (!bookList.length) {
      dispatch(getBooksAction(filters))
    }
  }, [])

  return (
    <div className={classes.root}>
      <Filters />
      {!!bookList.length && bookList.map(book => <Card book={book} key={book.id} />)}
    </div>

  )
}
