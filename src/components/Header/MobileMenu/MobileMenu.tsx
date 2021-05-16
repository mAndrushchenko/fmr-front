import { VFC } from 'react'
import { Link } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Divider from '@material-ui/core/Divider'
import Badge from '@material-ui/core/Badge'

import { styles } from './styles'

export const MobileMenu: VFC<{ open: boolean, toggle: () => void }> = ({ open, toggle }) => {
  const classes = styles()

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
      <Link
        className={classes.link}
        onClick={toggle}
        to='/signin'
      >
        Log in
      </Link>
    </Drawer>
  )
}
