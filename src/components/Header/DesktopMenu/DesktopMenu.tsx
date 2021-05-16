import { VFC } from 'react'

import { Link } from 'react-router-dom'
import Badge from '@material-ui/core/Badge'

import { styles } from './styles'

export const DesktopMenu: VFC = () => {
  const classes = styles()

  return (
    <div className={classes.root}>
      <Link className={classes.link} to='/catalog'>Catalog</Link>
      <Link className={classes.link} to='/online-reader'>
        Online reader
        <Badge
          badgeContent='new'
          variant='dot'
          color='secondary'
        >
          &nbsp;
        </Badge>
      </Link>
      <Link className={classes.link} to='/my-books'>My Books</Link>
      <Link className={classes.link} to='/basket'>Basket</Link>
      <Link className={classes.link} to='/about'>About us</Link>
      <Link className={classes.link} to='/signin'>Log in</Link>
    </div>
  )
}