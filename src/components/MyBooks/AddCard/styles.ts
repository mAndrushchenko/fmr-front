import { makeStyles } from '@material-ui/core'
import { cardRoot } from '../styles'

export const useStyles = makeStyles({
  root: {
    ...cardRoot,
    padding: '10px'
  },
  innerBorder: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    border: '5px dashed gray',
    borderRadius: 'inherit'
  },
  title: {
    textAlign: 'center'
  }
})
