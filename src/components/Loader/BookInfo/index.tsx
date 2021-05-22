import { VFC } from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from 'src/store/slices/userSlice'

import Typography from '@material-ui/core/Typography'

import { AdminForm } from '../AdminForm'
import { UserForm } from '../UserForm'

export const BookInfo: VFC = () => {
  const { isAdmin, token } = useSelector(userSelector)

  return (
    <div>
      <Typography variant='h4'>
        Upload your book
      </Typography>
      <AdminForm />
      {/* {token && (isAdmin ? <AdminForm /> : <UserForm />)} */}
    </div>
  )
}
