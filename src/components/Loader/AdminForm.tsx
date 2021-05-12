import { VFC, useState, useCallback } from 'react'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core/styles'

const styles = makeStyles({
  fileUpload: {
    display: 'none'
  },
  submit: {
    marginTop: '24px'
  }
})

export const AdminForm: VFC = () => {
  const classes = styles()

  const [ form, setForm ] = useState({
    name: '',
    image: '',
    author: '',
    genre: '',
    keywords: '',
    price: 0,
    releaseYear: new Date().getFullYear()
  })

  const fieldChangeHandler = useCallback(
    e => {
      setForm({
        ...form,
        [e.target.id]: e.target.value
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

  return (
    <form>
      <TextField
        id='name'
        variant='outlined'
        margin='normal'
        label='Name'
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
      <FormControl variant='outlined' fullWidth margin='normal' required>
        <InputLabel id='genre-label'>Genre</InputLabel>
        <Select
          labelId='genre-label'
          label='Genre'
          id='genre'
          value={form.genre}
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
      />
      <label htmlFor='image'>
        <Button
          component='span'
          color='primary'
          variant='outlined'
        >
          Upload image
        </Button>
      </label>
      <TextField
        id='keywords'
        variant='outlined'
        margin='normal'
        label='Keywords'
        value={form.keywords}
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
        value={form.releaseYear}
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
        value={form.price}
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
      />
      <label htmlFor='bookFile'>
        <Button
          component='span'
          color='primary'
          variant='outlined'
        >
          Upload book
        </Button>
      </label>

      <Button
        color='primary'
        variant='outlined'
        type='submit'
        className={classes.submit}
      >
        Add book
      </Button>
    </form>
  )
}
