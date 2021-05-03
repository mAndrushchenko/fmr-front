import { VFC } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Header } from '../Header'

export const Main: VFC = () => (
  <main>
    <Router>
      <Header />
      <Switch>
        <Route>

        </Route>
      </Switch>
    </Router>
  </main>
)
