import {
  useCallback,
  useState,
  VFC,
  MouseEvent
} from 'react'
import { Slider } from '@material-ui/core'
import { useStyles, useProgressSliderStyles } from './styles'

interface ProgressBarProps {
  value: number
  onChange?: (value: number) => void
  onPause?: (state?: boolean) => void
}

export const Progress: VFC<ProgressBarProps> = ({
  value,
  onChange,
  onPause
}) => {
  const classes = useStyles()
  const [ animated, setAnimated ] = useState(true)
  const sliderClasses = useProgressSliderStyles({ animate: animated })
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
    <div className={classes.root} onClick={pauseClickHandler}>
      <Slider
        value={value}
        classes={sliderClasses}
        onChange={sliderChangeHandler}
        onChangeCommitted={sliderChangeCommitedHandler}
      />
      <p className={classes.text}>{`${value.toFixed()}% / 100%`}</p>
    </div>
  )
}
