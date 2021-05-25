import { VFC, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBooksAction, shopSelector } from 'src/store/slices/shopSlice'
import type { TAppDispatch } from 'src/types/store'
import { styles } from './styles'
import { Card } from '../Card'

export const Library: VFC = () => {
  const classes = styles()
  const dispatch = useDispatch<TAppDispatch>()
  const { books, filters } = useSelector(shopSelector)
  const bookList = useMemo(() => books || [], [ books ])

  useEffect(() => {
    if (!bookList.length) {
      dispatch(getBooksAction(filters))
    }
  }, [ dispatch, bookList ])

  return (
    <div className={classes.container}>
      {bookList.map(book => {
        return <Card book={book} key={book.id || Date.now() + (Math.floor(Math.random() * 10 ** 10))} />
      })}
    </div>
  )
}
