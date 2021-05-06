import { VFC } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles({
  root: {
    border: '1px solid #000',
    borderRadius: '5px',
    marginTop: '100px',
    marginLeft: '30px',
    width: '220px',
    height: '370px'
  },
  image: {
    width: '100%',
    height: '270px',
    objectFit: 'cover',
    borderRadius: '5px'
  },
  title: {
    marginTop: 0,
    fontWeight: 'bold',
    fontFamily: 'inherit',
    color: '#3b393f',
    marginBottom: '0',
    fontSize: 16
  },
  text: {
    padding: '0 5px 5px'
  },
  author: {
    marginBottom: '5px',
    marginTop: 0,
    color: '#767579'
  },
  price: {
    margin: 0,
    fontSize: 18,
    fontWeight: 600
  }
})

interface ICard {
  book: {
    name: string;
    author: string;
    image: string;
    price: string
  }
}

export const Card: VFC<ICard> = ({ book }) => {
  const classes = style()

  return (
    <div className={classes.root}>
      <img src={book.image} alt='book preview' className={classes.image} />
      <div className={classes.text}>
        <p className={classes.title}>
          {book.name}
        </p>
        <p className={classes.author}>
          {book.author}
        </p>
        <p className={classes.price}>
          {book.price}
        </p>
      </div>
    </div>
  )
}
