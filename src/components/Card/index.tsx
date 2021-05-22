import { VFC } from 'react'

import { TBook } from 'src/types/store'

import { styles } from './styles'

export const Card: VFC<{ book: TBook }> = ({ book }) => {
  const classes = styles()

  return (
    <div className={classes.root}>
      <img src={book.image} alt='book preview' className={classes.image} />
      <div className={classes.text}>
        <p className={classes.name}>
          {book.name}
        </p>
        <p className={classes.author}>
          {book.author}
        </p>
        <p className={classes.price}>
          $
          {book.price}
        </p>
      </div>
    </div>
  )
}
