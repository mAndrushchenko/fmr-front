import React, { VFC, useState, useCallback } from 'react'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import { Divider } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { TAppDispatch } from '../../types/store'
import { userSelector } from '../../store/slices/userSlice'
import { bookNameRegexp } from '../../shared/constant/regExp'

import { styles } from './styles'
import { keywordsError, nameBookError, uploadBookError } from '../../shared/constant/errorMasseges'

const initialBookState = {
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
  const classes = styles()
  const dispatch = useDispatch<TAppDispatch>()
  const { token } = useSelector(userSelector)

  const [ error, setError ] = useState('')
  const [ keywords, setKeywords ] = useState('')

  const [ form, setForm ] = useState(initialBookState)

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

  const imageHandler = useCallback(async e => {
    const bookData = new FormData()
    await bookData.append('image', e.target.files[0])
    setForm({ ...form, bookData })
  }, [ form ])

  const bookHandler = useCallback(async e => {
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
    // dispatch(uploadBookAction({ book, token }))
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
        <FormControl variant='outlined' fullWidth margin='normal' required>
          <InputLabel id='genre-label'>Genre</InputLabel>
          <Select
            labelId='genre-label'
            label='Genre'
            id='genre'
            value={form.bookInfo.genre}
            onChange={genreChangeHandler}
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

        <Divider className={classes.divider} />

        <Button
          color='primary'
          variant='outlined'
          type='submit'
          className={classes.submit}
        >
          Add book
        </Button>
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
