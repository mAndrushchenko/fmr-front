import { VFC, useRef, useCallback } from 'react'
import { PauseRounded } from '@material-ui/icons'
import { useInterval } from '../../../hooks/useInterval'
import { useStyles } from './styles'

interface VisualizerProps {
  className?: string
  tokenList: string[]
  index: number
  speed: number
  fontSize: number
  paused?: boolean
  onNext: (tokenIndex: number) => void
  onEnd?: (tokenIndex: number) => void
  onPause?: (state?: boolean) => void
}

export const Visualizer: VFC<VisualizerProps> = ({
  className,
  tokenList,
  index,
  speed,
  fontSize,
  paused = false,
  onNext,
  onEnd,
  onPause
}) => {
  const classes = useStyles({ fontSize })
  const currentToken = tokenList[index]
  const delayRef = useRef<number>((60 / speed) * 1000)
  delayRef.current = (60 / speed) * 1000

  useInterval(() => {
    if (paused) return true
    if (tokenList.length <= index + 1) {
      onEnd?.(index)
      return true
    }

    onNext?.(++index)
  }, delayRef, [ paused, onNext ])

  const pauseClickHandler = useCallback(() => onPause?.(), [])

  return (
    <div className={`${classes.root} ${className}`} onClick={pauseClickHandler}>
      {paused && <PauseRounded className={classes.paused} />}
      <p className={classes.text}>{currentToken}</p>
    </div>
  )
}
