import { VFC, useState, useCallback } from 'react'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import { TUsersBookLoader } from 'src/types/bookLoader'
import { useDispatch, useSelector } from 'react-redux'
import { TAppDispatch } from '../../../types/store'
import { uploadBookAction, userSelector } from '../../../store/slices/userSlice'
import { bookNameRegexp } from '../../../shared/constant/regExp'
import { nameBookError, uploadBookError } from '../../../shared/constant/errorMasseges'

import { Genres } from '../../Genres'

const initialBookState: TUsersBookLoader = {
  bookInfo: {
    name: '',
    author: '',
    genre: '',
    description: ''
  },
  bookData: new FormData()
}

export const UserForm: VFC = () => {
  const dispatch = useDispatch<TAppDispatch>()
  const { token } = useSelector(userSelector)
  const [ form, setForm ] = useState<TUsersBookLoader>(initialBookState)

  const [ error, setError ] = useState('')

  const fieldChangeHandler = useCallback(e => {
    setForm({
      ...form,
      bookInfo: {
        ...form.bookInfo,
        [e.target.id || 'genre']: e.target.value
      }
    })
  }, [ form ])

  const genreChangeHandler = useCallback(e => {
    setForm({
      ...form,
      bookInfo: {
        ...form.bookInfo, genre: e.target.value
      }
    })
  }, [ form ])

  const closeHandler = useCallback(() => {
    setError('')
  }, [])

  const submitHandler = useCallback(e => {
    e.preventDefault()

    if (!form.bookData.get('book')) {
      return setError(uploadBookError)
    }
    if (!bookNameRegexp.test(form.bookInfo.name.trim())) {
      return setError(nameBookError)
    }
    dispatch(uploadBookAction({ token, book: form }))
    return setForm(initialBookState)
  }, [ form ])

  return (
    <>
      <form onSubmit={submitHandler}>
        <TextField
          id='name'
          variant='outlined'
          margin='normal'
          label='Name of book'
          value={form.bookInfo.name}
          onChange={fieldChangeHandler}
          fullWidth
          required
        />
        <TextField
          id='author'
          variant='outlined'
          margin='normal'
          label='Author'
          value={form.bookInfo.author}
          onChange={fieldChangeHandler}
          fullWidth
          required
        />
        <Genres value={form.bookInfo.genre} setValue={genreChangeHandler} />
        <TextField
          id='description'
          variant='outlined'
          margin='normal'
          label='Description'
          value={form.bookInfo.description}
          onChange={fieldChangeHandler}
          fullWidth
          required
        />
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={!!error}
        autoHideDuration={3000}
        onClose={closeHandler}
      >
        <Alert severity='warning'>{error}</Alert>
      </Snackbar>
    </>
  )
}
