import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '0.5rem 3%',
      [theme.breakpoints.up('md')]: {
        justifyContent: 'space-between'
      }
    },
    burger: {
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    },
    input: {
      width: '100%',
      background: 'rgba(255, 255, 255, 0.15)',
      // padding: '1px 10px',
      borderRadius: '5px',
      color: 'inherit'
    },
    search: {
      width: 0,
      display: 'hidden',
      [theme.breakpoints.up('md')]: {
        width: 0
      },
      transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
    },
    searchActive: {
      position: 'relative',
      minWidth: '170px',
      maxWidth: '500px',
      width: '40%',
      [theme.breakpoints.up('md')]: {
        width: '30%'
      },
      transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'

    },
    searchIcon: {
      position: 'absolute',
      zIndex: 500,
      right: '20px',
      top: '50%',
      transform: 'translateY(-50%)'
    },
    label: {
      width: '48px',
      height: '48px',
      marginRight: 'auto',
      [theme.breakpoints.up('md')]: {
        marginRight: '0'
      }
    },
    image: {
      width: '100%'
    },
    themeIcon: {
      width: '36px',
      height: '36px',
      minWidth: 0,
      color: 'inherit'
    }
  }))
