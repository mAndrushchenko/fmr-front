import { styled } from '@material-ui/core'
import { useCallback, useState, VFC, MouseEvent } from 'react'
import { ControlItem } from './ControlItem'

interface ControlsProps {
  className?: string
  fontSize: number
  speed: number
  onSpeedChange?: (value: number) => void
  onFontSizeChange?: (value: number) => void
  onPause?: (state?: boolean) => void
}

const ControlsRoot = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
})

export const Controls: VFC<ControlsProps> = ({
  className,
  fontSize,
  speed,
  onSpeedChange,
  onFontSizeChange,
  onPause
}) => {
  const [ fontSizeState, setFontSize ] = useState(fontSize)
  const [ speedState, setSpeed ] = useState(speed)
  const speedChangeHandler = useCallback(
    (value: number) => {
      setSpeed(value)
      onSpeedChange?.(value)
    },
    [ onSpeedChange ]
  )
  const fontSizeChangeHandler = useCallback(
    (value: number) => {
      setFontSize(value)
      onFontSizeChange?.(value)
    },
    [ onFontSizeChange ]
  )
  const pauseClickHandler = useCallback(
    (event: MouseEvent) =>
      event.currentTarget === event.target && onPause?.(),
    []
  )

  return (
    <ControlsRoot className={className} onClick={pauseClickHandler}>
      <ControlItem
        name='Font Size'
        value={fontSizeState}
        onChange={fontSizeChangeHandler}
        onPause={onPause}
      />
      <ControlItem
        name='Speed'
        max={1000}
        value={speedState}
        onChange={speedChangeHandler}
        onPause={onPause}
      />
    </ControlsRoot>
  )
}
