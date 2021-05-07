import { styled, Slider } from '@material-ui/core'
import { useCallback, VFC } from 'react'

interface ControlItemProps {
  name: string
  value: number
  min?: number
  max?: number
  onChange?: (value: number) => void
}

const ControlItemRoot = styled('div')({
  display: 'flex',
  width: '80%',
  alignItems: 'center'
})

const Value = styled('h3')({
  marginLeft: '10px'
})

const Name = styled('h3')({
  marginRight: '10px'
})

export const ControlItem: VFC<ControlItemProps> = ({
  name,
  value,
  min,
  max,
  onChange
}) => {
  const changeHandler = useCallback(
    (event: unknown, eventValue: number | number[]) => {
      if (Array.isArray(eventValue)) {
        [ eventValue ] = eventValue
      }

      onChange?.(eventValue as number)
    },
    [ onChange ]
  )

  return (
    <ControlItemRoot>
      <Name>{name}</Name>
      <Slider
        value={value}
        min={min}
        max={max}
        onChange={changeHandler}
      />
      <Value>{value}</Value>
    </ControlItemRoot>
  )
}