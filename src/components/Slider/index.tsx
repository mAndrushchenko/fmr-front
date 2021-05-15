import { VFC } from 'react'
import Slider from 'react-slick'
import { TBook } from 'src/types/store'
import { Card } from '../Card'

export const CardSlider: VFC = () => {
  const sliderSettings = {
    dots: false,
    infinite: false,
    slidesToShow: 4
  }

  const books: TBook[] = [
    {
      id: 9809898,
      name: 'sdsd',
      image: 'sdcsdcsd',
      keywords: [ 'sdc', 'sdcs' ],
      releaseYear: 2009,
      author: 'dfvd',
      genre: 'dfv',
      price: 12.333
    }
  ]

  return (
    <Slider {...sliderSettings}>
      {books.map(book => (
        <Card book={book} />
      ))}
    </Slider>
  )
}
