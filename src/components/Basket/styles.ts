import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '20px'
    },
    item: {
      height: '150px',
      margin: '15px 0',
      padding: '7px 10px',
      borderRadius: '10px',
      border: '2px solid #ccc',
      display: 'flex',
      [theme.breakpoints.up(480)]: {
        height: '250px',
        padding: '15px 20px',
        margin: '30px 0'
      }
    },
    bookInfo: {
      marginLeft: '1rem',
      marginRight: 'auto',
      [theme.breakpoints.up(480)]: {
        marginLeft: '2rem'
      }
    },
    bookImage: {
      height: '100%',
      borderRadius: '5px'
    },
    deleteIcon: {
      alignSelf: 'center'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    title: {
      fontSize: '14px',
      [theme.breakpoints.up(480)]: {
        fontSize: '16px'
      }
    },
    price: {
      fontWeight: 'bold',
      fontSize: '14px',
      [theme.breakpoints.up(480)]: {
        fontSize: '16px'
      }
    },
    bookName: {
      [theme.breakpoints.up(480)]: {
        fontSize: '22px'
      }
    }
  }))
