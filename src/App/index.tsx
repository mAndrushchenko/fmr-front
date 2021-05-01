import { VFC } from 'react'
import { CssBaseline } from '@material-ui/core'
import { Main } from '../components/Main'
import { Header } from '../components/Header'

export const App: VFC = () => (
  <>
    <CssBaseline />
    <Header />
    <Main />
  </>
)
