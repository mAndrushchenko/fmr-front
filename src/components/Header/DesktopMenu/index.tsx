import React, { useCallback, VFC } from 'react'

import { Link } from 'react-router-dom'
import Badge from '@material-ui/core/Badge'

import { useAuth } from 'src/hooks/useAuth'
import { useSelector } from 'react-redux'
import { userSelector } from 'src/store/slices/userSlice'

import { styles } from './styles'

export const DesktopMenu: VFC = () => {
  const { token } = useSelector(userSelector)
  const { logout } = useAuth()
  const classes = styles()

  const onLogout = useCallback(() => {
    logout()
  }, [])

  return (
    <div className={classes.root}>
      <Link className={classes.link} to='/library'>Library</Link>
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
      {!token
        ? <Link className={classes.link} to='/signin'>Log in</Link>
        : <Link className={classes.link} to='/' onClick={onLogout}>Log out</Link>}
    </div>
  )
}
