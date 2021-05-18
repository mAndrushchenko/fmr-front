import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'none',
      color: 'inherit',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        whiteSpace: 'nowrap'
      }
    },
    link: {
      lineHeight: 1.75,
      textTransform: 'uppercase',
      textAlign: 'center',
      textDecoration: 'none',
      color: 'inherit',
      padding: '6px 8px',
      fontWeight: 500
    }
  }))
