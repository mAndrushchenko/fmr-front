import { VFC, useState, useCallback } from 'react'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

// import { TUsersBookLoader } from 'src/types/bookLoader'
import { useDispatch, useSelector } from 'react-redux'
import { TAppDispatch } from 'src/types/store'
import { userSelector } from 'src/store/slices/userSlice'

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
  const dispatch = useDispatch<TAppDispatch>()
  const { token } = useSelector(userSelector)
  const [ form, setForm ] = useState(initialBookState)

  const [ error, setError ] = useState('')

  const fieldChangeHandler = useCallback(e => {
    setForm({
      ...form,
      [e.target.id || 'genre']: e.target.value
    })
  }, [ form ])

  const genreChangeHandler = useCallback(e => {
    setForm({
      ...form,
      genre: e.target.value
    })
  }, [ form ])

  const closeHandler = useCallback(() => {
    setError('')
  }, [])

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
      <Genres value={form.genre} setValue={genreChangeHandler}/>
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
