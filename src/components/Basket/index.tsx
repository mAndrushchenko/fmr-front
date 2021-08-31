import { VFC, useState, useCallback } from 'react'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'

import defaultImage from 'src/assets/img/book/book.light-theme.png'
import type { TShopBook } from 'src/types/store'
import { Payment } from '../Payment'
import { DialogWindow } from './DialogWindow'
import { styles } from './styles'

export const Basket: VFC = () => {
  const classes = styles()

  const [ open, setOpen ] = useState(false)

  const agreeHandler = useCallback(() => {
    setOpen(false)
    // code for deleting book
  }, [])

  const disagreeHandler = useCallback(() => {
    setOpen(false)
  }, [])

  const openHandler = useCallback(() => {
    setOpen(true)
  }, [])

  // develop code
  const bookExample: TShopBook = {
    description: 'Very long description',
    id: 0,
    name: 'book name',
    author: 'dfvdf',
    genre: 'dvdfv',
    image: null,
    price: 12.99,
    keywords: [ 'ssdc', 'sdc' ],
    releaseYear: 2003
  }
  let count = 0
  const arrOfBook: TShopBook[] = []
  while (count < 15) {
    arrOfBook.push({ ...bookExample, id: Math.floor(Math.random() * 1000) })
    count++
  }
  // end of develop code

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant='overline' className={classes.title}>
          Items in basket:
          {arrOfBook.length}
        </Typography>
        <Payment label='buy all' />
      </div>
      {
        arrOfBook.map(book => (
          <div key={book.id} className={classes.item}>
            {book.image
              ? <img src={book.image} alt='book preview' className={classes.bookImage} />
              : <img src={defaultImage} alt='book preview' className={classes.bookImage} />}

            <div className={classes.bookInfo}>
              <Typography variant='h6' className={classes.bookName}>{book.name}</Typography>
              <Typography variant='subtitle1' className={classes.price}>{book.price}</Typography>
            </div>
            <div className={classes.actions}>
              <IconButton onClick={openHandler} color='secondary'>
                <DeleteIcon fontSize='large' />
              </IconButton>
              <Payment label='buy' />
            </div>
            <DialogWindow open={open} agreeHandler={agreeHandler} disagreeHandler={disagreeHandler} />
          </div>
        ))
      }
    </div>
  )
}
