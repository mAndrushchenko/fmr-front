import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          height: '100%'
        },
        body: {
          height: '100%'
        },
        '#root': {
          height: '100%'
        }
      }
    }
  }
})
