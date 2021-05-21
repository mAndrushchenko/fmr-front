import React, { VFC, useState, useCallback } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import { TUsersBookLoader } from 'src/types/bookLoader'
import { useDispatch, useSelector } from 'react-redux'
import { TAppDispatch } from '../../types/store'
import { uploadBookAction, userSelector } from '../../store/slices/userSlice'
import { bookNameRegexp } from '../../shared/constant/regExp'
import { nameBookError, uploadBookError } from '../../shared/constant/errorMasseges'

import { styles } from './styles'

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
  const classes = styles()
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

  const imageHandler = useCallback(e => {
    const bookData = new FormData()
    bookData.append('image', e.target.files[0])
    setForm({ ...form, bookData })
  }, [ form ])

  const genreChangeHandler = useCallback(e => {
    setForm({
      ...form,
      bookInfo: {
        ...form.bookInfo, genre: e.target.value
      }
    })
  }, [ form ])

  const bookHandler = useCallback(e => {
    form.bookData.append('book', e.target.files[0])
    setForm({ ...form })
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
        <FormControl
          variant='outlined'
          margin='normal'
          className={classes.select}
          required
        >
          <InputLabel id='genre-label'>Genre</InputLabel>
          <Select
            labelId='genre-label'
            id='genre'
            label='Genre'
            value={form.bookInfo.genre}
            onChange={genreChangeHandler}
            fullWidth
          >
            <MenuItem value='Detective'>Detective</MenuItem>
            <MenuItem value='Fantastic'>Fantastic</MenuItem>
            <MenuItem value='Psychology'>Psychology</MenuItem>
            <MenuItem value='Roman'>Roman</MenuItem>
            <MenuItem value='Fantasy'>Fantasy</MenuItem>
            <MenuItem value='Business'>Business</MenuItem>
            <MenuItem value='Autobiography'>Autobiography</MenuItem>
            <MenuItem value='Thrillers'>Thrillers</MenuItem>
            <MenuItem value='Horror'>Horror</MenuItem>
            <MenuItem value='Poem'>Poem</MenuItem>
            <MenuItem value='Comics'>Comics</MenuItem>
            <MenuItem value='Memoirs'>Memoirs</MenuItem>
            <MenuItem value='History'>History</MenuItem>

          </Select>
        </FormControl>
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
        <div>
          <TextField
            type='file'
            id='image'
            inputProps={{
              accept: '.jpg, .jpeg, .png'
            }}
            className={classes.fileUpload}
            onChange={imageHandler}
          />
          <label htmlFor='image'>
            <Button
              component='span'
              color='primary'
              variant='outlined'
              className={classes.button}
            >
              Upload image
            </Button>
          </label>

          <TextField
            type='file'
            id='bookFile'
            inputProps={{
              accept: '.txt, .epub, .fb2, .doc, .docx, .odt'
            }}
            className={classes.fileUpload}
            onChange={bookHandler}
          />
          <label htmlFor='bookFile'>
            <Button
              component='span'
              color='primary'
              variant='outlined'
              className={classes.button}
            >
              Upload book
            </Button>
          </label>
        </div>
        <Button
          type='submit'
          variant='outlined'
          color='primary'
          className={classes.submit}
        >
          Add book
        </Button>
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
