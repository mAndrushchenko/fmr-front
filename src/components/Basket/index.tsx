import { VFC } from 'react'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import { TShopBook } from '../../types/store'
import { styles } from './styles'

export const Basket: VFC = () => {
  const classes = styles()

  // develop code
  const bookExample: TShopBook = {
    description: 'Very long description',
    id: 9898,
    name: 'book name',
    author: 'dfvdf',
    genre: 'dvdfv',
    image: 'https://upload.wikimedia.org/wikipedia/ru/1/10/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8_%22%D0%9D%D0%B0%D0%B2%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%22%2C_%D0%9C%D0%B0%D0%BA%D1%81_%D0%A4%D1%80%D0%B0%D0%B9.jpg',
    price: 12.99,
    keywords: [ 'ssdc', 'sdc' ],
    releaseYear: 2003
  }
  let count = 0
  const arrOfBook: TShopBook[] = []
  while (count < 15) {
    arrOfBook.push(bookExample)
    count++
  }
  // end of develop code

  return (
    <div className={classes.root}>
      <div>
        <Typography variant='overline'>
          Items in basket:
          {arrOfBook.length}
        </Typography>
      </div>
      {
        arrOfBook.map(book => (
          <div className={classes.item}>
            <img src={book.image} alt='book preview' className={classes.bookImage} />
            <div className={classes.bookInfo}>
              <Typography variant='h6'>{book.name}</Typography>
              <Typography variant='subtitle1'>{book.price}</Typography>
            </div>
            <DeleteIcon />
          </div>
        ))
      }
    </div>
  )
}
