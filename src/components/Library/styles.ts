import { makeStyles } from '@material-ui/core'

export const styles = makeStyles({
  root: {
    width: '100%',
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10
  },
  item: {
    minWidth: '250px',
    margin: '15px auto'
  }
})
