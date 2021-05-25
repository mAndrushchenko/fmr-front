import { VFC, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBooksAction, shopSelector } from 'src/store/slices/shopSlice'
import type { TAppDispatch } from 'src/types/store'
import { styles } from './styles'

export const Library: VFC = () => {
  const classes = styles()
  const dispatch = useDispatch<TAppDispatch>()
  const { books, filters } = useSelector(shopSelector)
  const bookList = useMemo(() => books, [ books ])

  useEffect(() => {
    if (!bookList.length) {
      dispatch(getBooksAction(filters))
    }
  }, [ dispatch, bookList ])

  return (
    <div className={classes.container}>
      {bookList.map(book => <div key={book.id}>Book data</div>)}
    </div>
  )
}
