import { VFC } from 'react'
import { styled, LinearProgress } from '@material-ui/core'

interface ProgressBarProps {
  value: number
}

const ProgressRoot = styled('div')({
  padding: '10px'
})

const ProgressText = styled('p')({
  fontSize: '16px',
  textAlign: 'center',
  margin: '8px 0'
})

const ProgressBar = styled(
  props => <LinearProgress {...props} variant='determinate' />
)({
  height: 10,
  borderRadius: 5
})

export const Progress: VFC<ProgressBarProps> = ({ value }) => (
  <ProgressRoot>
    <ProgressBar value={value} />
    <ProgressText>{`${value.toFixed()}% / 100%`}</ProgressText>
  </ProgressRoot>
)
