import { VFC } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { styled } from '@material-ui/core'
import { Reader } from '../Reader'

const MainRoot = styled('main')({
  height: '100%'
})

export const Main: VFC = () => (
  <MainRoot>
    <Router>
      <Switch>
        <Route path='/'>
          <Reader />
        </Route>
      </Switch>
    </Router>
  </MainRoot>
)
