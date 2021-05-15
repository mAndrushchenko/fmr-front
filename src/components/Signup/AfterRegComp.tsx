import React from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  Button,
  Typography,
  makeStyles,
  CardActions,
  CardContent,
  CardActionArea
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
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
  }
})

export const AfterRegComp = () => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography
            className={classes.title}
            gutterBottom
            variant='h5'
            component='h2'
          >
            Brilliant!
          </Typography>
          <Typography
            className={classes.message}
            variant='body2'
            color='textSecondary'
            component='p'
          >
            We have been sent you a letter on your email.
            Please, confirm your registration and come back to us and sign in! 🙂
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div className={classes.btn}>
          <Link to='/signin'>
            <Button
              color='primary'
            >
              Sign in
            </Button>
          </Link>
        </div>
      </CardActions>
    </Card>
  )
}
