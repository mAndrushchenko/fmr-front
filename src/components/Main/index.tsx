import { VFC } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Header } from '../Header'
import { Signin } from '../Signin'
import { Signup } from '../Signup'

export const Main: VFC = () => (
  <main>
    <Router>
      <Header />
      <Switch>
        <Route path='/signin'>
          <Signin />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
      </Switch>
    </Router>
  </main>
)
