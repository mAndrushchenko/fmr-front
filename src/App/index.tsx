import { VFC } from 'react'
import { CssBaseline } from '@material-ui/core'
import { Signin } from '../components/Signin'

export const App: VFC = () => {
  return <>
    <CssBaseline />
    <main>
      <Signin />
    </main>
  </>
}
