import { styled, Slider } from '@material-ui/core'
import { useCallback, useState, VFC } from 'react'

interface ControlsProps {
  className?: string
  fontSize: number
  speed: number
  onSpeedChange?: (value: number) => void
  onFontSizeChange?: (value: number) => void
}

type SliderHandlerFabricCallback = ((value: number) => void) | undefined

const sliderHandlerFabric = (...callbacks: SliderHandlerFabricCallback[]) =>
  (event: unknown, value: number | number[]) => {
    if (Array.isArray(value)) {
      [ value ] = value
    }
    callbacks.forEach(cb => cb?.(value as number))
  }

const ControlsRoot = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
})

const ControlItem = styled('div')({
  display: 'flex',
  width: '80%',
  alignItems: 'center'
})

const SliderValue = styled('h3')({
  marginLeft: '10px'
})

export const Controls: VFC<ControlsProps> = ({
  className,
  fontSize,
  speed,
  onSpeedChange,
  onFontSizeChange
}) => {
  const [ fontSizeState, setFontSize ] = useState(fontSize)
  const [ speedState, setSpeed ] = useState(speed)
  const speedChangeHandler = useCallback(
    sliderHandlerFabric(setSpeed, onSpeedChange),
    [ onSpeedChange ]
  )
  const fontSizeChangeHandler = useCallback(
    sliderHandlerFabric(setFontSize, onFontSizeChange),
    [ onFontSizeChange ]
  )

  return (
    <ControlsRoot className={className}>
      <ControlItem>
        <Slider value={fontSizeState} onChange={fontSizeChangeHandler} />
        <SliderValue>{fontSizeState}</SliderValue>
      </ControlItem>
      <ControlItem>
        <Slider value={speedState} onChange={speedChangeHandler} max={1000} />
        <SliderValue>{speedState}</SliderValue>
      </ControlItem>
    </ControlsRoot>
  )
}
