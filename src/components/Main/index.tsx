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
import { Results } from '../Results'
import { Basket } from '../Basket'

export const Main: VFC = () => {
  const classes = styles()

  return (
    <div className={classes.root}>
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
          <Route path='/basket'>
            <Basket />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}
