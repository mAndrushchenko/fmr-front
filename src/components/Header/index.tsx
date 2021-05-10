import { VFC, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'

import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'

import logo from '../../assets/img/logo/dark.png'
import { MobileMenu } from './MobileMenu'
import { DesktopMenu } from './DesktopMenu'

const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '0.5rem 3%',
      [theme.breakpoints.up('md')]: {
        justifyContent: 'space-between'
      }
    },
    burger: {
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    },
    input: {
      width: '100%',
      background: 'rgba(255, 255, 255, 0.15)',
      padding: '1px 10px',
      borderRadius: '5px',
      color: 'inherit'
    },
    search: {
      position: 'relative',
      minWidth: '170px',
      maxWidth: '500px',
      width: '40%',
      [theme.breakpoints.up('md')]: {
        width: '30%'
      }
    },
    searchIcon: {
      position: 'absolute',
      zIndex: 500,
      right: '20px',
      top: '50%',
      transform: 'translateY(-50%)'
    },
    label: {
      width: '48px',
      height: '48px',
      marginRight: 'auto',
      [theme.breakpoints.up('md')]: {
        marginRight: '0'
      }
    },
    image: {
      width: '100%'
    },
    themeIcon: {
      width: '36px',
      height: '36px',
      minWidth: 0,
      color: 'inherit'
    }
  }))

export const Header: VFC = () => {
  const classes = styles()

  const [ search, setSearch ] = useState('')
  const [ open, setOpen ] = useState(false)
  const [ isDark, setIsDark ] = useState(true)

  const searchChangeHandler = useCallback(e => {
    setSearch(e.target.value)
  }, [])

  const toggleMenu = useCallback(() => {
    setOpen(!open)
  }, [ open ])

  const inputKeyHandler = useCallback(e => {
    if (e.key === 'Enter' && search) {
      console.log(search)
    }
  }, [ search ])

  const searchButtonHandler = useCallback(() => {
    if (search) {
      console.log(search)
    }
  }, [ search ])

  const toggleTheme = useCallback(() => {
    setIsDark(!isDark)
  }, [ isDark ])

  return (
    <>
      <AppBar>
        <Toolbar className={classes.root}>
          <Link
            className={classes.label}
            to='/'
          >
            <img src={logo} className={classes.image} alt='logo' />
          </Link>
          <DesktopMenu />
          <div className={classes.search}>
            <InputBase
              placeholder='Search a book...'
              className={classes.input}
              value={search}
              onChange={searchChangeHandler}
              onKeyPress={inputKeyHandler}
            />
            <SearchIcon
              className={classes.searchIcon}
              onClick={searchButtonHandler}
            />
          </div>
          <Button className={classes.themeIcon} onClick={toggleTheme}>
            {isDark ? <Brightness4Icon /> : <Brightness7Icon />}
          </Button>
          <IconButton
            onClick={toggleMenu}
            className={classes.burger}
            edge='end'
            color='inherit'
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <MobileMenu open={open} toggle={toggleMenu} />
    </>
  )
}
