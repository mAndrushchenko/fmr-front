import React, { useCallback, VFC } from 'react'
import { Link } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Divider from '@material-ui/core/Divider'

import { Typography } from '@material-ui/core'
import { styles } from './styles'

interface IMobileMenu {
  logout: () => void
  savedToken: string | null
  open: boolean
  toggle: () => void
  userName: string
}

export const MobileMenu: VFC<IMobileMenu> = ({ open, toggle, logout, savedToken, userName }) => {
  const classes = styles()

  const onLogout = useCallback(() => {
    logout()
  }, [])

  return (
    <Drawer
      variant='persistent'
      anchor='right'
      className={classes.drawer}
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={toggle}>
          <ChevronRightIcon />
        </IconButton>
        <Typography className={classes.userName}>{userName || ''}</Typography>
      </div>
      <Divider />
      <Link
        className={classes.link}
        onClick={toggle}
        to='/library'
      >
        Library
      </Link>
      <Link
        className={classes.link}
        onClick={toggle}
        to='/my-books'
      >
        My Books
      </Link>
      <Link
        className={classes.link}
        onClick={toggle}
        to='/basket'
      >
        Basket
      </Link>
      <Link
        className={classes.link}
        onClick={toggle}
        to='/about'
      >
        About us
      </Link>
      {!savedToken
        ? <Link className={classes.link} to='/signin'>Log in</Link>
        : <Link className={classes.link} to='/' onClick={onLogout}>Log out</Link>}

    </Drawer>
  )
}
