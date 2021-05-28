import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    form: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      padding: '0 20px'
    },
    title: {
      width: '100%'
    },
    author: {
      flexBasis: '100%',
      marginRight: 'auto',
      [theme.breakpoints.up('md')]: {
        flexBasis: '49.3%'
      }
    },
    genres: {
      flexBasis: '100%',
      [theme.breakpoints.up('md')]: {
        flexBasis: '49.3%'
      }
    },
    searchPhrase: {
      flexBasis: '100%',
      marginRight: 'auto',
      [theme.breakpoints.up('md')]: {
        flexBasis: '49.3%'
      }
    },
    year: {
      flexBasis: '100%',
      [theme.breakpoints.up('md')]: {
        flexBasis: '49.3%'
      }
    },
    minPriceInput: {
      flexBasis: '100%',
      [theme.breakpoints.up(520)]: {
        flexBasis: '45%',
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    },
    maxPriceInput: {
      flexBasis: '100%',
      [theme.breakpoints.up(520)]: {
        flexBasis: '45%',
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    },
    priceSlider: {
      flexBasis: '100%'
    }
  }))
