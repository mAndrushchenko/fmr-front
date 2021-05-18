import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const animationStyle = 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'

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
      width: 0,
      transition: animationStyle
    },
    inputActive: {
      width: '100%',
      background: 'rgba(255, 255, 255, 0.15)',
      padding: '1px 10px',
      borderRadius: '5px',
      color: 'inherit',
      transition: animationStyle

    },
    linkGroup: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },

    userNameActive: {
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      },
      [theme.breakpoints.up('md')]: {
        lineHeight: 1.75,
        marginRight: 20,
        textTransform: 'uppercase',
        fontSize: 14,
        textAlign: 'center',
        textDecoration: 'none',
        color: 'inherit',
        fontWeight: 500,
        maxWidth: 180
      },
      transition: animationStyle
    },

    userName: {
      display: 'none',
      transition: animationStyle
    },

    search: {
      textTransform: 'uppercase',
      position: 'relative',
      minWidth: '80px',
      maxWidth: '500px',
      width: '5%',
      transition: animationStyle
    },

    searchActive: {
      marginRight: 0,
      position: 'relative',
      maxWidth: '500px',
      width: '100%',
      transition: animationStyle

    },
    buttonGroup: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      minWidth: '80px',
      width: '70%',
      [theme.breakpoints.up('md')]: {
        width: '25%'
      },
      transition: animationStyle
    },

    searchIcon: {
      position: 'absolute',
      zIndex: 500,
      right: '5px',
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
