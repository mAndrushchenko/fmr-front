import { makeStyles } from '@material-ui/core'

interface TextStyleProps {
  fontSize: number
}

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  paused: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 256,
    opacity: 0.1,
    zIndex: -1
  },
  text: {
    fontSize: (props: TextStyleProps) => props.fontSize ?? 16
  }
})
