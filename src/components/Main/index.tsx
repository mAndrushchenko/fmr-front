import { VFC } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { styled } from '@material-ui/core/styles'
import { Header } from '../Header'
import { Home } from '../Home'
import { Signin } from '../Signin'
import { Signup } from '../Signup'

const MainRoot = styled('main')({
  height: '100%',
  paddingTop: '64px'
})

export const Main: VFC = () => (
  <MainRoot>
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/signin'>
          <Signin />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
      </Switch>
    </Router>
  </MainRoot>
)
