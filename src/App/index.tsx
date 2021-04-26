import { VFC } from 'react'
import { CssBaseline } from '@material-ui/core'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Signin } from '../components/Signin'

export const App: VFC = () => (
  <>
    <CssBaseline />
    <main>
      <Router>
        <Switch>
          <Route path='/signin'>
            <Signin />
          </Route>
        </Switch>
      </Router>
    </main>
  </>
)
