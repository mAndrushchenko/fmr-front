export const sliderSettings = {
  dots: false,
  infinite: false,
  slidesToShow: 5,
  arrows: true,
  slidesToScroll: 4,
  touchThreshold: 50,
  responsive: [
    {
      breakpoint: 1260,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2
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
