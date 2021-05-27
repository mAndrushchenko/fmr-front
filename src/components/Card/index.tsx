import {
  VFC,
  useMemo,
  useState,
  useEffect,
  useCallback
} from 'react'
import Button from '@material-ui/core/Button'
import { useDispatch } from 'react-redux'
import { addToBasketAction } from 'src/store/slices/userSlice'
import defaultImage from 'src/assets/img/book/book.light-theme.png'
import type { TAppDispatch, TShopBook } from 'src/types/store'
import { styles } from './styles'

export const Card: VFC<{ book: TShopBook }> = ({ book }) => {
  const classes = styles()
  const dispatch = useDispatch<TAppDispatch>()
  const imgUrl = useMemo(() => book.image ? `/uploads/${book.image}` : null, [])
  const [ imgExist, setImageExist ] = useState(true)

  useEffect(() => {
    if (imgUrl) {
      fetch(imgUrl).then(({ ok }) => {
        if (!ok) {
          setImageExist(ok)
        }
      })
    }
  }, [])

  const addToBasket = useCallback(() => {
    dispatch(addToBasketAction({ book }))
  }, [ book, dispatch ])

  return (
    <div className={classes.root}>
      <div className={classes.imgContainer}>
        {imgExist && imgUrl
          ? <img src={imgUrl} alt='book preview' className={classes.image} />
          : <img src={defaultImage} alt='book preview' className={classes.defaultImage} />}
      </div>
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
      <div className={classes.btnBuyContainer}>
        <Button color='primary' onClick={addToBasket} className={classes.btnBuy}>
          Add to basket
        </Button>
      </div>
    </div>
  )
}
