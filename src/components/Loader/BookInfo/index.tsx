import { VFC } from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from 'src/store/slices/userSlice'
import type { TUsersBookInfoLoaderUser } from 'src/types/bookLoader'
import type { TUploadBook } from 'src/types/store'

import { AdminForm } from './AdminForm'
import { UserForm } from './UserForm'

interface IBookInfo {
  handleAdminBookInfo: (info: TUploadBook | null) => void,
  handleUserBookInfo: (info: TUsersBookInfoLoaderUser | null) => void,
}

export const BookInfo: VFC<IBookInfo> = ({ handleAdminBookInfo, handleUserBookInfo }) => {
  const { isAdmin, token } = useSelector(userSelector)
  return (
    <div>
      {token && (isAdmin
        ? <AdminForm handleAdminBookInfo={handleAdminBookInfo} />
        : <UserForm handleUserBookInfo={handleUserBookInfo} />)}
    </div>
  )
}
