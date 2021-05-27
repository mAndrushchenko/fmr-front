import { makeStyles } from '@material-ui/core'

export const useIndexStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
})

export const useControlItemStyles = makeStyles({
  root: {
    display: 'flex',
    width: '80%',
    alignItems: 'center'
  },
  value: {
    marginLeft: '10px'
  },
  name: {
    marginRight: '10px'
  }
})
