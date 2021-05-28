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
  image: 'https://upload.wikimedia.org/wikipedia/ru/1/10/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8_%22%D0%9D%D0%B0%D0%B2%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%22%2C_%D0%9C%D0%B0%D0%BA%D1%81_%D0%A4%D1%80%D0%B0%D0%B9.jpg'
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
