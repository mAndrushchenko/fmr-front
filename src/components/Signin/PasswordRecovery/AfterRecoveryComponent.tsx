import React, { VFC } from 'react'
import { Link } from 'react-router-dom'

import {
  Card,
  Button,
  Typography,
  CardContent,
  CardActions,
  CardActionArea
} from '@material-ui/core'

import { styles } from './styles'

export const AfterRecoveryComponent: VFC = () => {
  const classes = styles()

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
            Perfect!
          </Typography>
          <Typography
            className={classes.message}
            variant='body2'
            color='textSecondary'
            component='p'
          >
            We have been sent you a letter on your email.
            Please, confirm password recovery and come back to us and sign in! 😜
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
