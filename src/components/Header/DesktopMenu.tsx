import { VFC } from 'react'

import { Link } from 'react-router-dom'
import Badge from '@material-ui/core/Badge'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const style = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'none',
      color: 'inherit',
      [theme.breakpoints.up('md')]: {
        display: 'block'
      }
    },
    link: {
      lineHeight: 1.75,
      textTransform: 'uppercase',
      textAlign: 'center',
      textDecoration: 'none',
      color: 'inherit',
      padding: '6px 8px'
    }
  }))

export const DesktopMenu: VFC = () => {
  const classes = style()

  return (
    <div className={classes.root}>
      <Link className={classes.link} to='catalog'>Catalog</Link>
      <Link className={classes.link} to='online-reader'>
        Online reader
        <Badge
          badgeContent='new'
          variant='dot'
          color='secondary'
        >
          &nbsp;
        </Badge>
      </Link>
      <Link className={classes.link} to='my-books'>My Books</Link>
      <Link className={classes.link} to='basket'>Basket</Link>
      <Link className={classes.link} to='about'>About us</Link>
      <Link className={classes.link} to='signin'>Log in</Link>
    </div>
  )
}
