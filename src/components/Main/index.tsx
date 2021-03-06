import { VFC } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { styled } from '@material-ui/core'
import { Reader } from '../Reader'
import { Header } from '../Header'
import { Loader } from '../Loader'
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
        <Route path='/signin'>
          <Signin />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/loader'>
          <Loader />
        </Route>
        <Route path='/online-reader'>
          <Reader />
        </Route>
      </Switch>
    </Router>
  </MainRoot>
)
