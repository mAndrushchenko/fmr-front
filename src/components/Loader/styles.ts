import { makeStyles } from '@material-ui/core/styles'

export const loaderStyles = makeStyles({
  root: {
    padding: '30px',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  title: {
    margin: '2rem 0'
  },
  stepperButton: {
    margin: '0 0.3rem',
    '&:first-child': {
      marginLeft: 0
    }
  },
  divider: {
    margin: '1rem 0'
  }
})

export const uploadStyles = makeStyles({
  input: {
    display: 'none'
  }
})
