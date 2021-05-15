import { VFC } from 'react'
import Slider from 'react-slick'
import { makeStyles } from '@material-ui/core/styles'

import { TBook } from 'src/types/store'
import { Card } from '../Card'

const styles = makeStyles({
  slider: {
    position: 'relative',
    padding: '0 30px',
    // setting the way to display content
    '& .slick-track': {
      display: 'flex'
    },
    '& .slick-slide': {
      flexShrink: 0
    },
    '& .slick-list': {
      overflow: 'hidden'
    },
    // desgning buttons
    '& .slick-arrow': {
      position: 'absolute',
      top: '50%',
      fontSize: 0,
      background: 'none',
      zIndex: 1000,
      // creating arrow
      border: 'solid black',
      borderWidth: '0 3px 3px 0',
      display: 'inline-block',
      padding: '10px',
      transition: 'all 0.3s ease-in-out',
      '&.slick-prev': {
        left: '10px',
        transform: 'translateY(-50%) rotate(135deg)'
      },
      '&.slick-next': {
        right: '10px',
        transform: 'translateY(-50%) rotate(-45deg)'
      },
      '&.slick-disabled': {
        borderColor: 'grey'
      }
    }
  }
})

export const CardSlider: VFC<{ books: TBook[] }> = ({ books }) => {
  const classes = styles()

  // slider settings
  const sliderSettings = {
    dots: false,
    infinite: false,
    slidesToShow: 5,
    arrows: true,
    slidesToScroll: 3,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 1260,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 1018,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 540,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1
        }
      }
    ]
  }

  return (
    <Slider
      className={classes.slider}
      {...sliderSettings}
    >
      {books.map(book => (
        <Card key={book.name} book={book} />
      ))}
    </Slider>
  )
}
