import { VFC } from 'react'
import { CssBaseline } from '@material-ui/core'
import { Signup } from '../components/Signup'

export const App: VFC = () => {
  return <>
    <CssBaseline />
    <main>
      <Signup />
    </main>
  </>
}
