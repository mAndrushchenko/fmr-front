import { makeStyles } from '@material-ui/core/styles'

export const formStyles = makeStyles({
  fileUpload: {
    display: 'none'
  },
  divider: {
    marginTop: '24px'
  },
  select: {
    width: '100%'
  },
  button: {
    marginTop: '16px',
    marginRight: '15px'
  },
  submit: {
    marginTop: '24px'
  }
})

export const loaderStyles = makeStyles({
  root: {
    padding: '30px',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  stepper: {
    backgroundColor: 'inherit'
  }
})
