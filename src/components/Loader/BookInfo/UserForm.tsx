import { VFC, useState, useCallback, useEffect } from 'react'
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
    setForm(prevForm => ({ ...prevForm, [e.target.id]: e.target.value }))
  }, [])

  const genreChangeHandler = useCallback(e => {
    setForm(prevForm => ({ ...prevForm, genre: e.target.value }))
  }, [])

  useEffect(() => {
    handleUserBookInfo(form)
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
