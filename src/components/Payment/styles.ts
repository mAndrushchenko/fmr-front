import { makeStyles } from '@material-ui/core/styles'

export const styles = makeStyles({
  form: {
    minWidth: '290px',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#fff',
    padding: '20px'
  },
  modal: {
    background: 'rgba(0, 0, 0, 0.5)'
  },
  button: {
    marginTop: '20px'
  },
  sum: {
    height: '36px',
    marginLeft: '10px',
    fontSize: '20px'
  },
  date: {
    fontSize: '30px',
    display: 'flex',
    alignItems: 'center'
  },
  month: {
    width: '80px',
    marginRight: '10px'
  },
  year: {
    width: '80px',
    marginLeft: '10px'
  }
})
