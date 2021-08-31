import { useMemo, VFC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Typography } from '@material-ui/core'
import type { TAppDispatch } from 'src/types/store'
import { getBooksAction, shopSelector } from 'src/store/slices/shopSlice'
import { TShopBook } from 'src/types/store'
import { CardSlider } from '../Slider'

import { styles } from './styles'

export const Home: VFC = () => {
  const classes = styles()
  const dispatch = useDispatch<TAppDispatch>()
  const { books, filters } = useSelector(shopSelector)
  const bookList = useMemo(() => books, [ books ])
  // l - length of bookList array
  const l = useMemo(() => bookList.length, [ bookList ])

  const newBooks: TShopBook[] = useMemo(() => bookList.slice(0, l / 3), [ bookList ])
  const popularBooks: TShopBook[] = useMemo(() => bookList.slice(l / 3, l * 0.67), [ bookList ])
  const personalOfferBooks: TShopBook[] = useMemo(() => bookList.slice(l * 0.67, l - 1), [ bookList ])

  useEffect(() => {
    if (!bookList.length) {
      dispatch(getBooksAction(filters))
    }
  }, [])

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
