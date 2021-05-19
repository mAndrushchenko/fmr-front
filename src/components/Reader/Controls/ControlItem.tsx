import { Slider } from '@material-ui/core'
import { useCallback, VFC, MouseEvent } from 'react'
import { useControlItemStyles } from './styles'

interface ControlItemProps {
  name: string
  value: number
  min?: number
  max?: number
  onChange?: (value: number) => void
  onPause?: (state?: boolean) => void
}

export const ControlItem: VFC<ControlItemProps> = ({
  name,
  value,
  min,
  max,
  onChange,
  onPause
}) => {
  const classes = useControlItemStyles()
  const changeHandler = useCallback(
    (event: unknown, eventValue: number | number[]) =>
      onChange?.(eventValue as number),
    [ onChange ]
  )
  const pauseClickHandler = useCallback(
    (event: MouseEvent) =>
      event.currentTarget === event.target && onPause?.(),
    []
  )

  return (
    <div className={classes.root} onClick={pauseClickHandler}>
      <h3 className={classes.name}>{name}</h3>
      <Slider
        value={value}
        min={min}
        max={max}
        onChange={changeHandler}
      />
      <h3 className={classes.value}>{value}</h3>
    </div>
  )
}
