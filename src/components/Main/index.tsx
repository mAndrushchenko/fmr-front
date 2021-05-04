import { VFC } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Signin } from '../Signin'

export const Main: VFC = () => (
  <main>
    <Router>
      <Switch>
        <Route path='/signin'>
          <Signin />
        </Route>
      </Switch>
    </Router>
  </main>
)
