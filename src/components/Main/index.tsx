import { VFC } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Header } from '../Header'
import { Home } from '../Home'

export const Main: VFC = () => (
  <main>
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
      </Switch>
    </Router>
    <h1>Main here!</h1>
  </main>
)
