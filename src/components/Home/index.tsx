import { useMemo, VFC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Typography } from '@material-ui/core'
import type { TAppDispatch } from 'src/types/store'
import { getBooksAction, shopSelector } from 'src/store/slices/shopSlice'
import { TShopBook } from 'src/types/store'
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
  // const newBooks: TShopBook[] = useMemo(() => arrOfBook, [])
  // const personalOfferBooks: TShopBook[] = useMemo(() => arrOfBook, [])
  // const popularBooks: TShopBook[] = useMemo(() => arrOfBook, [])

  const dispatch = useDispatch<TAppDispatch>()
  const { books, filters } = useSelector(shopSelector)
  const bookList = useMemo(() => books, [ books ])

  useEffect(() => {
    if (!bookList.length) {
      dispatch(getBooksAction(filters))
    }
  }, [])

  console.log(bookList)

  const newBooks: TShopBook[] = useMemo(() => bookList.slice(0, bookList.length / 3), [])
  const popularBooks: TShopBook[] = useMemo(() => bookList.slice(bookList.length / 3, bookList.length * 0.67), [])
  const personalOfferBooks: TShopBook[] = useMemo(() => bookList.slice(bookList.length * 0.67, bookList.length - 1), [])

  return (
    <div className={classes.root}>
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
