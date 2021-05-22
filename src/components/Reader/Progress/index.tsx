import React, {
  useCallback,
  useState,
  VFC,
  MouseEvent
} from 'react'
import {
  styled,
  withStyles,
  Slider,
  SliderTypeMap
} from '@material-ui/core'
import type { OverrideProps } from '../../../utils/OverrideProps'

interface ProgressBarProps {
  value: number
  onChange?: (value: number) => void
  onPause?: (state?: boolean) => void
}

interface ProgressSliderProps {
  animate?: boolean
}

const ProgressRoot = styled('div')({
  padding: '10px'
})

const ProgressText = styled('p')({
  fontSize: '16px',
  textAlign: 'center',
  margin: '8px 0'
})

const ProgressSlider = withStyles({
  track: {
    width: 0,
    height: 10,
    borderRadius: '5px',
    transition: ({ animate }: ProgressSliderProps) =>
      animate ? 'width .4s linear' : ''
  },
  rail: {
    height: 10,
    borderRadius: 5
  },
  thumb: {
    display: 'none'
  }
// Self made OverrideProps with SliderTypeMap instead of SliderProps,
// because of a bug in SliderProps, which caused to incorrect props override
})((
  props: OverrideProps<'span', SliderTypeMap['props']> & ProgressSliderProps
) => {
  const { animate, ...others } = props
  return <Slider {...others} />
})

export const Progress: VFC<ProgressBarProps> = ({
  value,
  onChange,
  onPause
}) => {
  const [ animated, setAnimated ] = useState(true)
  const sliderChangeCommitedHandler = useCallback(() => setAnimated(true), [])
  const sliderChangeHandler = useCallback(
    (_: unknown, newValue: number | number[]) => {
      setAnimated(false)
      onChange?.(newValue as number)
    },
    []
  )
  const pauseClickHandler = useCallback(
    (event: MouseEvent) =>
      event.currentTarget === event.target && onPause?.(),
    []
  )

  return (
    <ProgressRoot onClick={pauseClickHandler}>
      <ProgressSlider
        value={value}
        animate={animated}
        onChange={sliderChangeHandler}
        onChangeCommitted={sliderChangeCommitedHandler}
      />
      <ProgressText>{`${value.toFixed()}% / 100%`}</ProgressText>
    </ProgressRoot>
  )
}
