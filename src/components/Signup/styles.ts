import { makeStyles } from '@material-ui/core/styles'

export const styles = makeStyles({
  root: {
    maxWidth: '1000px',
    padding: '30px 30px 0',
    margin: '0 auto'
  },

  button: {
    marginTop: '30px'
  },

  singnup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },

  cardRoot: {
    margin: '0 auto',
    maxWidth: 345
  },
  media: {
    height: 140
  },
  title: {
    textAlign: 'center'
  },
  message: {
    fontSize: 20
  },
  btn: {
    width: '100%',
    textAlign: 'center'
  },
  spinner: {
    position: 'fixed',
    left: '50%',
    top: '50%'
  }

})
