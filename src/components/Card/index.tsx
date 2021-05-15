import { VFC } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { TBook } from 'src/types/store'

const style = makeStyles({
  root: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '220px',
    height: '370px',
    margin: '0 auto'
  },
  image: {
    width: '100%',
    height: '270px',
    objectFit: 'cover',
    borderRadius: '5px'
  },
  name: {
    marginTop: 0,
    fontWeight: 'bold',
    fontFamily: 'inherit',
    color: '#3b393f',
    marginBottom: '0',
    fontSize: 16
  },
  text: {
    padding: '10px 7px 5px'
  },
  author: {
    marginBottom: '10px',
    marginTop: 0,
    color: '#767579'
  },
  price: {
    margin: 0,
    fontSize: 18,
    fontWeight: 600
  }
})

export const Card: VFC<{ book: TBook }> = ({ book }) => {
  const classes = style()

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
