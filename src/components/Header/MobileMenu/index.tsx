import React, { useCallback, VFC } from 'react'
import { Link } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Divider from '@material-ui/core/Divider'
import Badge from '@material-ui/core/Badge'

import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { userSelector } from 'src/store/slices/userSlice'
import { useAuth } from 'src/hooks/useAuth'
import { styles } from './styles'

export const MobileMenu: VFC<{ open: boolean, toggle: () => void }> = ({ open, toggle }) => {
  const { savedToken, logout } = useAuth()
  const { name } = useSelector(userSelector)
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
        <Typography className={classes.userName}>{name}</Typography>
      </div>
      <Divider />
      <Link
        className={classes.link}
        onClick={toggle}
        to='/catalog'
      >
        Catalog
      </Link>
      <Link
        className={classes.link}
        onClick={toggle}
        to='/online-reader'
      >
        Online reader
        <Badge
          badgeContent='new'
          variant='dot'
          color='secondary'
        >
          &nbsp;
        </Badge>
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
