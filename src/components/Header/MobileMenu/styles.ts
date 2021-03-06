import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    drawerHeader: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: theme.spacing(1, 0),
      ...theme.mixins.toolbar
    },
    drawer: {
      postion: 'relative',
      width: '100%',
      maxWidth: '576px',
      flexShrink: 0,
      [theme.breakpoints.up(576)]: {
        width: 480
      },
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    },
    drawerPaper: {
      width: '100%',
      maxWidth: '576px',
      [theme.breakpoints.up(576)]: {
        width: 480
      }
    },
    userName: {
      textAlign: 'center',
      width: '200px',
      position: 'absolute',
      left: 'calc(50% - 100px)',
      textTransform: 'uppercase',
      fontSize: 14
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
