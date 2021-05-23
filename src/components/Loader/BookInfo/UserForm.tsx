import { VFC, useState, useCallback } from 'react'
import TextField from '@material-ui/core/TextField'
import { Genres } from 'src/components/Genres'

import type { TUsersBookInfoLoaderUser } from 'src/types/bookLoader'

interface IUserBookInfo {
  handleUserBookInfo: (info: TUsersBookInfoLoaderUser | null) => void,
}

const initialBookState = {
  name: '',
  author: '',
  genre: '',
  description: ''
}

export const UserForm: VFC<IUserBookInfo> = ({ handleUserBookInfo }) => {
  const [ form, setForm ] = useState(initialBookState)

  const fieldChangeHandler = useCallback(e => {
    const newForm = { ...form, [e.target.id]: e.target.value }
    setForm(newForm)
    handleUserBookInfo(newForm)
  }, [ form ])

  const genreChangeHandler = useCallback(e => {
    const newForm = { ...form, genre: e.target.value }
    setForm(newForm)
    handleUserBookInfo(newForm)
  }, [ form ])

  return (
    <>
      <TextField
        id='name'
        variant='outlined'
        margin='normal'
        label='Name of book'
        value={form.name}
        onChange={fieldChangeHandler}
        fullWidth
        required
      />
      <TextField
        id='author'
        variant='outlined'
        margin='normal'
        label='Author'
        value={form.author}
        onChange={fieldChangeHandler}
        fullWidth
        required
      />
      <Genres value={form.genre} setValue={genreChangeHandler} />
      <TextField
        id='description'
        variant='outlined'
        margin='normal'
        label='Description'
        value={form.description}
        onChange={fieldChangeHandler}
        fullWidth
        required
      />

    </>
  )
}
