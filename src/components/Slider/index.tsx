import { VFC } from 'react'
import Slider from 'react-slick'

export const CardSlider: VFC = () => {
  const sliderSettings = {
    dots: false,
    infinite: false,
    slidesToShow: 4
  }

  return (
    <Slider {...sliderSettings}>
      
    </Slider>
  )
}
