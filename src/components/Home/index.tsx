import { Typography } from '@material-ui/core'
import { VFC } from 'react'
import { TShopBook } from 'src/types/store'
import { Filters } from '../Filters'
import { CardSlider } from '../Slider'

import { styles } from './styles'

// next code only for develop
const book: TShopBook = {
  description: 'Very long description',
  id: 9898,
  name: 'dfvdf',
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
  arrOfBook.push(book)
  count++
}
// end of develop code

export const Home: VFC = () => {
  const classes = styles()

  const newBooks: TShopBook[] = arrOfBook
  const personalOfferBooks: TShopBook[] = arrOfBook
  const popularBooks: TShopBook[] = arrOfBook

  return (
    <div className={classes.root}>
      <Filters />
      <div className={classes.category}>
        <Typography variant='h6' className={classes.title}>
          News
        </Typography>
        <CardSlider books={newBooks} />
      </div>
      <div className={classes.category}>
        <Typography variant='h6' className={classes.title}>
          Bestsellers
        </Typography>
        <CardSlider books={popularBooks} />
      </div>
      <div className={classes.category}>
        <Typography variant='h6' className={classes.title}>
          You may also like
        </Typography>
        <CardSlider books={personalOfferBooks} />
      </div>
    </div>
  )
}
