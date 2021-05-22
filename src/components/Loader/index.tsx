import { VFC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { BookInfo } from './BookInfo'

const styles = makeStyles({
  root: {
    padding: '30px',
    maxWidth: '1000px',
    margin: '0 auto'
  }
})

export const Loader: VFC = () => {
  const classes = styles()

  return (
    <div className={classes.root}>
      <BookInfo />
    </div>
  )
}
