import { useEffect, VFC } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@material-ui/core'
import { Reader } from '../Reader'
import { Header } from '../Header'
import { Loader } from '../Loader'
import { Signin } from '../Signin'
import { Signup } from '../Signup'
import { PasswordRecovery } from '../Signin/PasswordRecovery'
import { spinnerSelector } from '../../store/slices/spinnerSlice'
import { styles } from './styles'
import { setUserDataAction, setUserToken, userSelector } from '../../store/slices/userSlice'
import { TAppDispatch } from '../../types/store'
import { useAuth } from '../../hooks/useAuth'

export const Main: VFC = () => {
  const { spin } = useSelector(spinnerSelector)
  const dispatch = useDispatch<TAppDispatch>()
  const user = useSelector(userSelector)
  const { savedToken, isTokenExist } = useAuth()

  useEffect(() => {
    isTokenExist()
    if (savedToken && !user.token) {
      dispatch(setUserToken({ token: savedToken }))
      dispatch(setUserDataAction({ token: savedToken }))
    }
  }, [ savedToken, dispatch ])

  const classes = styles()
  return (
    <div className={classes.root}>
      {spin && <div className={classes.spinner}><CircularProgress /></div>}
      <Router>
        <Header />
        <Switch>
          <Route path='/signin'>
            <Signin />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/loader'>
            <Loader />
          </Route>
          <Route path='/online-reader'>
            <Reader />
          </Route>
          <Route path='/password-recovery'>
            <PasswordRecovery />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}
