import { VFC } from 'react'
import { useSelector } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { userSelector } from 'src/store/slices/userSlice'
import { AdminForm } from './AdminForm'
import { UserForm } from './UserForm'

const styles = makeStyles({
  root: {
    padding: '30px',
    maxWidth: '1000px',
    margin: '0 auto'
  }
})

export const Loader: VFC = () => {
  const classes = styles()
  const { isAdmin, token } = useSelector(userSelector)

  return (
    <div className={classes.root}>
      <Typography variant='h4'>
        Upload your book
      </Typography>
      {token && (isAdmin ? <AdminForm /> : <UserForm />)}
    </div>
  )
}
