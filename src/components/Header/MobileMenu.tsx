import { VFC } from 'react'
import { Link } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Divider from '@material-ui/core/Divider'
import Badge from '@material-ui/core/Badge'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const style = makeStyles((theme: Theme) =>
  createStyles({
    drawerHeader: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: theme.spacing(1, 0),
      ...theme.mixins.toolbar
    },
    drawer: {
      width: 320,
      flexShrink: 0,
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    },
    drawerPaper: {
      width: 320
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

export const MobileMenu: VFC<{ open: boolean, toggle: () => void }> = ({ open, toggle }) => {
  const classes = style()

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
      <Link className={classes.link} onClick={toggle} to='catalog'>Catalog</Link>
      <Link className={classes.link} onClick={toggle} to='online-reader'>
        Online reader
        <Badge
          badgeContent='new'
          variant='dot'
          color='secondary'
        >
          &nbsp;
        </Badge>
      </Link>
      <Link className={classes.link} onClick={toggle} to='my-books'>My Books</Link>
      <Link className={classes.link} onClick={toggle} to='basket'>Basket</Link>
      <Link className={classes.link} onClick={toggle} to='about'>About us</Link>
      <Link className={classes.link} onClick={toggle} to='signin'>Log in</Link>
    </Drawer>
  )
}
