import { VFC, useState, useCallback } from 'react'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import { TAdminBookLoader } from 'src/types/bookLoader'
import { useDispatch, useSelector } from 'react-redux'
import { TAppDispatch } from '../../types/store'
import { uploadBookAction, userSelector } from '../../store/slices/userSlice'
import { bookNameRegexp } from '../../shared/constant/regExp'

import { keywordsError, nameBookError, uploadBookError } from '../../shared/constant/errorMasseges'
import { Genres } from '../Genres'

const initialBookState: TAdminBookLoader = {
  bookInfo: {
    name: '',
    author: '',
    genre: '',
    keywords: [],
    price: 0,
    description: '',
    releaseYear: new Date().getFullYear()
  },
  bookData: new FormData()
}

export const AdminForm: VFC = () => {
  const dispatch = useDispatch<TAppDispatch>()
  const { token } = useSelector(userSelector)

  const [ error, setError ] = useState('')
  const [ keywords, setKeywords ] = useState('')

  const [ form, setForm ] = useState<TAdminBookLoader>(initialBookState)

  const fieldChangeHandler = useCallback(e => {
    setForm({
      ...form,
      bookInfo: {
        ...form.bookInfo,
        [e.target.id]: e.target.value
      }
    })
  }, [ form ])

  const keywordsChangeHandler = useCallback(e => {
    setKeywords(e.target.value)
  }, [])

  const genreChangeHandler = useCallback(e => {
    setForm({
      ...form,
      bookInfo: {
        ...form.bookInfo,
        genre: e.target.value
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
    if (!keywords) {
      return setError(keywordsError)
    }
    const arrOfKeywords = keywords.split(',').map(word => word.trim())
    const book = {
      ...form,
      bookInfo: {
        ...form.bookInfo,
        keywords: arrOfKeywords,
        price: +form.bookInfo.price
      }
    }
    dispatch(uploadBookAction({ book, token }))
    return setForm(initialBookState)
  }, [ form, keywords, token ])

  return (
    <>
      <form onSubmit={submitHandler}>
        <TextField
          id='name'
          variant='outlined'
          margin='normal'
          label='Name'
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
        <TextField
          id='keywords'
          variant='outlined'
          margin='normal'
          label='Keywords'
          value={keywords}
          onChange={keywordsChangeHandler}
          fullWidth
          required
        />
        <TextField
          id='releaseYear'
          type='number'
          variant='outlined'
          margin='normal'
          label='Release year'
          value={form.bookInfo.releaseYear}
          onChange={fieldChangeHandler}
          fullWidth
          required
        />
        <TextField
          id='price'
          type='number'
          variant='outlined'
          margin='normal'
          label='Price'
          value={form.bookInfo.price}
          onChange={fieldChangeHandler}
          fullWidth
          required
        />
      </form>

      <Snackbar
        open={!!error}
        onClose={closeHandler}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        <Alert severity='warning'>{error}</Alert>
      </Snackbar>
    </>
  )
}
