import { VFC } from 'react'
import { CssBaseline } from '@material-ui/core'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Signup } from '../components/Signup'

export const App: VFC = () => (
  <>
    <CssBaseline />
    <main>
      <Router>
        <Switch>
          <Route path='/signup'>
            <Signup />
          </Route>
        </Switch>
      </Router>
    </main>
  </>
)
