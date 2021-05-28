import { useCallback, useEffect, VFC } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { TId } from 'src/types/store'
import { deepEqual } from 'src/utils/deepEqual'
import { getMyBooksAction } from 'src/store/slices/myBooksSlice'
import defaultImage from 'src/assets/img/book/book.light-theme.png'
import { useStyles } from './styles'
import { BookCard } from './BookCard'
import { AddCard } from './AddCard'

export const MyBooks: VFC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const books = useSelector(store => store.myBooksSlice.books, deepEqual)
  const history = useHistory()
  const bookClickHandler = useCallback((id: TId['id']) => {
    history.push(`/my-books/${id}/read`)
  }, [ history ])
  const addBookHandler = useCallback(() => {
    history.push('/my-books/upload')
  }, [ history ])

  useEffect(() => void dispatch(getMyBooksAction()), [])

  return (
    <div className={classes.root}>
      {books.map(book => (
        <BookCard
          id={book.id}
          name={book.name}
          author={book.author}
          image={book.image ? `uploads/${book.image}` : defaultImage}
          onClick={bookClickHandler}
        />))}
      <AddCard onClick={addBookHandler} />
    </div>
  )
}
