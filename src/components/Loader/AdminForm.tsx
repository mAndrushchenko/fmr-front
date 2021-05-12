import { VFC, useState, useCallback } from 'react'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import { makeStyles } from '@material-ui/core/styles'

import { TAdminBookLoader } from 'src/types/bookLoader'
import { Divider } from '@material-ui/core'

const styles = makeStyles({
  fileUpload: {
    display: 'none'
  },
  submit: {
    marginTop: '24px'
  },
  button: {
    marginTop: '16px'
  },
  divider: {
    marginTop: '24px'
  }
})

export const AdminForm: VFC = () => {
  const classes = styles()

  const [ form, setForm ] = useState<TAdminBookLoader>({
    bookInfo: {
      name: '',
      image: null,
      author: '',
      genre: '',
      keywords: '',
      price: 0,
      releaseYear: new Date().getFullYear()
    },
    bookFile: new FormData()
  })

  const [ error, setError ] = useState('')

  const fieldChangeHandler = useCallback(
    e => {
      setForm({
        ...form,
        bookInfo: {
          ...form.bookInfo,
          [e.target.id]: e.target.value
        }
      })
    },
    [ form ]
  )

  const genreChangeHandler = useCallback(
    e => {
      setForm({
        ...form,
        bookInfo: {
          ...form.bookInfo,
          genre: e.target.value
        }
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
        bookInfo: {
          ...form.bookInfo,
          image
        }
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
        setError('You had not uploaded book')
      } else {
        const data = {
          ...form,
          bookInfo: {
            ...form.bookInfo,
            keywords: form.bookInfo.keywords.split(',')
              .map(word => word.trim()),
            price: +form.bookInfo.price
          }
        }
        console.log(data)
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
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value='10'>Ten</MenuItem>
            <MenuItem value='20'>Twenty</MenuItem>
            <MenuItem value='30'>Thirty</MenuItem>
          </Select>
        </FormControl>
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
          value={form.bookInfo.keywords}
          onChange={fieldChangeHandler}
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
            accept: '.pdf, .txt, .epub, .fb2'
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
