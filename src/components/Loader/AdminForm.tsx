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

const nameRegexp = /^[a-z0-9]+(\s[a-z0-9]+)*$/i

export const AdminForm: VFC = () => {
  const classes = styles()

  const [ form, setForm ] = useState<TAdminBookLoader>({
    bookInfo: {
      name: '',
      author: '',
      genre: '',
      keywords: '',
      price: 0,
      releaseYear: new Date().getFullYear()
    },
    fd: new FormData()
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
    async e => {
      const fd = new FormData()
      await fd.append('image', e.target.files[0])
      setForm({ ...form, fd })

      // for login Form Data
      for (let key of fd) {
        console.log('key ', key)
      }

    },
    [ form ]
  )

  const bookHandler = useCallback(
    async e => {
      form.fd.append('book', e.target.files[0])
      setForm({ ...form })

      // for login Form Data
      for (let key of form.fd) {
        console.log('key ', key)
      }

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

      if (!form.fd.get('book')) {
        setError('You had not uploaded book')
      } else if (nameRegexp.test(form.bookInfo.name.trim())) {
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
      } else {
        console.log(form.bookInfo.name.trim(), nameRegexp.test(form.bookInfo.name.trim()))
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
