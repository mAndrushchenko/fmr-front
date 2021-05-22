import { VFC } from 'react'
import Slider from 'react-slick'

import { TShopBook } from 'src/types/store'
import { Card } from '../Card'

import { styles } from './styles'
import { sliderSettings } from './sliderSettings'

export const CardSlider: VFC<{ books: TShopBook[] }> = ({ books }) => {
  const classes = styles()

  return (
    <Slider
      className={classes.slider}
      {...sliderSettings}
    >
      {books.map(book => (
        <Card key={book.id} book={book} />
      ))}
    </Slider>
  )
}