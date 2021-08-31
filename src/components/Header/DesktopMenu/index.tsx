import React, { useCallback, VFC } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { userSelector } from 'src/store/slices/userSlice'
import { styles } from './styles'

interface IDesktopMenu {
  logout: () => void
  savedToken: string | null
}

export const DesktopMenu: VFC<IDesktopMenu> = ({ logout, savedToken }) => {
  const classes = styles()
  const { token } = useSelector(userSelector)

  const onLogout = useCallback(() => {
    logout()
  }, [])

  return (
    <div className={classes.root}>
      <Link className={classes.link} to='/library'>Library</Link>
      {token && <Link className={classes.link} to='/my-books'>My Books</Link>}
      <Link className={classes.link} to='/basket'>Basket</Link>
      <Link className={classes.link} to='/about'>About us</Link>
      {!savedToken
        ? <Link className={classes.link} to='/signin'>Log in</Link>
        : <Link className={classes.link} to='/' onClick={onLogout}>Log out</Link>}
    </div>
  )
}
