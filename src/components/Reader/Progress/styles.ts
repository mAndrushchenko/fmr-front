import { makeStyles } from '@material-ui/core'

export interface ProgressSliderProps {
  animate?: boolean
}

export const useStyles = makeStyles({
  root: {
    padding: '10px'
  },
  text: {
    fontSize: '16px',
    textAlign: 'center',
    margin: '8px 0'
  }
})

export const useProgressSliderStyles = makeStyles({
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
})
