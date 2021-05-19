import { VFC, useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'

import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import { Typography } from '@material-ui/core'

import logo from '../../assets/img/logo/dark.png'
import { MobileMenu } from './MobileMenu/MobileMenu'
import { DesktopMenu } from './DesktopMenu/DesktopMenu'

import { styles } from './styles'
import { setUserDataAction, userSelector } from '../../store/slices/userSlice'
import { useAuth } from '../../hooks/useAuth'
import { TAppDispatch } from '../../types/store'

export const Header: VFC = () => {
  const classes = styles()
  const dispatch = useDispatch<TAppDispatch>()
  const user = useSelector(userSelector)
  const { savedToken, isTokenExist } = useAuth()

  const [ search, setSearch ] = useState('')
  const [ open, setOpen ] = useState(false)
  const [ isDark, setIsDark ] = useState(true)
  const [ searchField, setSearchField ] = useState(false)

  useEffect(() => {
    isTokenExist()
    if (savedToken && !user.token) {
      dispatch(setUserDataAction({ token: savedToken }))
    }
  }, [ savedToken, user ])

  const toggleSearch = useCallback(() => {
    setSearchField(prevState => !prevState)
  }, [])

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
    toggleSearch()
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
          <div className={classes.linkGroup}>
            {user.name &&
            <Typography
              className={searchField ? classes.userName : classes.userNameActive}
              variant='body1'
            >
              {user.name}
            </Typography>}
            <DesktopMenu />
          </div>
          <div className={classes.buttonGroup}>
            <div
              className={searchField ? classes.searchActive : classes.search}
            >
              <InputBase
                placeholder='Search a book...'
                className={searchField ? classes.inputActive : classes.input}
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
          </div>
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
