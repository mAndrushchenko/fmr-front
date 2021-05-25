import { VFC } from 'react'

import { TShopBook } from 'src/types/store'

import { styles } from './styles'

export const Card: VFC<{ book: TShopBook }> = ({ book }) => {
  const classes = styles()

  return (
    <div className={classes.root}>
      <img src={`/uploads/${book.image || ''}`} alt='book preview' className={classes.image} />
      <div className={classes.text}>
        <p className={classes.name}>
          {book.name || 'missing book name'}
        </p>
        <p className={classes.author}>
          {book.author || 'missing author name'}
        </p>
        <p className={classes.price}>
          $
          {book.price || 'missing book price'}
        </p>
      </div>
    </div>
  )
}
