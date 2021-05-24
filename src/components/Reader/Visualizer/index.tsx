import { VFC, useCallback } from 'react'
import { PauseRounded } from '@material-ui/icons'
import { useInterval } from '../../../hooks/useInterval'
import { useStyles } from './styles'

interface VisualizerProps {
  className?: string
  word: string
  speed: number
  fontSize: number
  paused?: boolean
  onNext: () => void
  onPause?: (state?: boolean) => void
}

export const Visualizer: VFC<VisualizerProps> = ({
  className,
  word,
  speed,
  fontSize,
  paused = false,
  onNext,
  onPause
}) => {
  const classes = useStyles({ fontSize })
  const delay = (60 / speed) * 1000
  const pauseClickHandler = useCallback(() => onPause?.(), [])
  useInterval(() => onNext?.(), delay, paused)

  return (
    <div className={`${classes.root} ${className}`} onClick={pauseClickHandler}>
      {paused && <PauseRounded className={classes.paused} />}
      <p className={classes.text}>{word}</p>
    </div>
  )
}
