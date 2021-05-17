export const sliderSettings = {
  dots: false,
  infinite: false,
  slidesToShow: 3,
  arrows: true,
  slidesToScroll: 2,
  touchThreshold: 50,
  responsive: [
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
