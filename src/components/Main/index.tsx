import React, { VFC } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { Reader } from '../Reader'
import { Header } from '../Header'
import { Loader } from '../Loader'
import { Home } from '../Home'
import { Signin } from '../Signin'
import { Signup } from '../Signup'
import { PasswordRecovery } from '../Signin/PasswordRecovery'
import { styles } from './styles'
import { Library } from '../Library'
import { Spinner } from '../Spinner'
import { Results } from '../Results'

export const Main: VFC = () => {
  const classes = styles()

  return (
    <div className={classes.root}>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/signin'>
            <Signin />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/loader'>
            <Loader />
          </Route>
          <Route path='/online-reader/:id'>
            <Reader />
          </Route>
          <Route exact path='/online-reader'>
            <Redirect to='/' />
          </Route>
          <Route path='/library'>
            <Library />
          </Route>
          <Route path='/password-recovery'>
            <PasswordRecovery />
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/results'>
            <Results />
          </Route>
        </Switch>
      </Router>
      <Spinner />
    </div>
  )
}
