import { VFC } from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from 'src/store/slices/userSlice'

import { AdminForm } from './AdminForm'
import { UserForm } from './UserForm'

export const BookInfo: VFC = () => {
  const { isAdmin, token } = useSelector(userSelector)

  return (
    <div>
      {token && (isAdmin ? <AdminForm /> : <UserForm />)}
    </div>
  )
}
