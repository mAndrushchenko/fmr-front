import { VFC } from 'react'
import { AdminForm } from './AdminForm'
import { UserForm } from './UserForm'

export const Loader: VFC = () => {
  const isAdmin = true

  return (
    <>
      {isAdmin ? <AdminForm /> : <UserForm />}
    </>
  )
}
