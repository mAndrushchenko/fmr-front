import { VFC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CardSlider } from '../Slider'

const styles = makeStyles({
  root: {
    padding: '0.5rem'
  }
})

export const Home: VFC = () => {
  const classes = styles()

  return (
    <div className={classes.root}>
      jhbhjbh
    </div>
  )
}
