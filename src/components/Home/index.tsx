import { Typography } from '@material-ui/core'
import { useMemo, VFC } from 'react'
import { TShopBook } from 'src/types/store'
import { Filters } from '../Filters'
import { CardSlider } from '../Slider'

import { styles } from './styles'

// next code only for develop
const createBook = (): TShopBook => ({
  description: 'Very long description',
  id: Date.now() + (Math.floor(Math.random() * 10 ** 10)),
  name: 'dfvdf',
  author: 'dfvdf',
  genre: 'dvdfv',
  image: null,
  price: 12.99,
  keywords: [ 'ssdc', 'sdc' ],
  releaseYear: 2003
})
let count = 0
const arrOfBook: TShopBook[] = []
while (count < 15) {
  arrOfBook.push(createBook())
  count++
}
// end of develop code

export const Home: VFC = () => {
  const classes = styles()
  const newBooks: TShopBook[] = useMemo(() => arrOfBook, [])
  const personalOfferBooks: TShopBook[] = useMemo(() => arrOfBook, [])
  const popularBooks: TShopBook[] = useMemo(() => arrOfBook, [])

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
