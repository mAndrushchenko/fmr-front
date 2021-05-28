import { VFC } from 'react'
import { CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { spinnerSelector } from 'src/store/slices/spinnerSlice'
import { styles } from './styles'

export const Spinner: VFC = () => {
  const classes = styles()
  const { spin } = useSelector(spinnerSelector)

  return (
    <>
      {spin && <div className={classes.spinner}><CircularProgress /></div>}
    </>
  )
}
