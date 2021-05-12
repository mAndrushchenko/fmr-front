import { VFC, useState, useCallback } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import { makeStyles } from '@material-ui/core/styles'

import { TUsersBookLoader } from 'src/types/bookLoader'

const styles = makeStyles({
  fileUpload: {
    display: 'none'
  },
  select: {
    width: '100%'
  },
  button: {
    marginTop: '16px',
    marginRight: '15px'
  },
  submit: {
    marginTop: '24px'
  }
})

export const UserForm: VFC = () => {
  const classes = styles()

  const [ form, setForm ] = useState<TUsersBookLoader>({
    name: '',
    image: null,
    author: '',
    genre: '',
    bookFile: new FormData()
  })

  const [ error, setError ] = useState('')

  const fieldChangeHandler = useCallback(
    e => {
      setForm({
        ...form,
        [e.target.id || 'genre']: e.target.value
      })
    },
    [ form ]
  )

  const imageHandler = useCallback(
    e => {
      const image = new FormData()
      image.append('image', e.target.files[0])
      setForm({
        ...form,
        image
      })
    },
    [ form ]
  )

  const genreChangeHandler = useCallback(
    e => {
      setForm({
        ...form,
        genre: e.target.value
      })
    },
    [ form ]
  )

  const bookHandler = useCallback(
    e => {
      form.bookFile.append('book', e.target.files[0])
      setForm({
        ...form
      })
    },
    [ form ]
  )

  const closeHandler = useCallback(
    () => {
      setError('')
    },
    []
  )

  const submitHandler = useCallback(
    e => {
      e.preventDefault()

      if (!form.bookFile.get('book')) {
        setError('You had not uploaded book file!')
      } else {
        console.log('success')
      }
    },
    [ form ]
  )

  return (
    <>
      <form onSubmit={submitHandler}>
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
            value={form.genre}
            onChange={genreChangeHandler}
            fullWidth
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value='10'>Ten</MenuItem>
            <MenuItem value='20'>Twenty</MenuItem>
            <MenuItem value='30'>Thirty</MenuItem>
          </Select>
        </FormControl>
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
              accept: '.txt, .pdf, .fb2, .epub'
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
