import { useCallback, VFC } from 'react'
import { useHistory } from 'react-router-dom'
import { range } from 'src/utils/range'
import type { TId } from 'src/types/store'
import { useStyles } from './styles'
import { BookCard } from './BookCard'
import { AddCard } from './AddCard'

const testBooks = range(0, 6).map(() => ({
  id: 9898,
  name: 'dfvdf',
  author: 'dfvdf',
  description: 'Very long description',
  image: null
}))

export const MyBooks: VFC = () => {
  const classes = useStyles()
  const history = useHistory()
  const bookClickHandler = useCallback((id: TId['id']) => {
    history.push(`/my-books/${id}/read`)
  }, [ history ])
  const addBookHandler = useCallback(() => {
    history.push('/my-books/upload')
  }, [ history ])

  return (
    <div className={classes.root}>
      {testBooks.map(book => (
        <BookCard
          id={book.id}
          name={book.name}
          author={book.author}
          image={book.image}
          onClick={bookClickHandler}
        />))}
      <AddCard onClick={addBookHandler} />
    </div>
  )
}
