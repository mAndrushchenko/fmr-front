import { makeStyles } from '@material-ui/core/styles'

export const styles = makeStyles({
  root: {
    padding: '0.5rem'
  },
  category: {
    margin: '3rem 0',
    '&:first-child': {
      marginTop: 0
    },
    '&:last-child': {
      marginBottom: 0
    }
  },
  title: {
    paddingLeft: '3%',
    marginBottom: '1rem'
  }
})
