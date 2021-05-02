import { VFC } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { styled } from '@material-ui/core'

const MainRoot = styled('main')({
  height: '100%'
})

export const Main: VFC = () => (
  <MainRoot>
    <Router>
      <Switch>
        <Route>

        </Route>
      </Switch>
    </Router>
  </MainRoot>
)
