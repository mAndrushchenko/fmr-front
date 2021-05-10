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
        value={form.name}
        onChange={fieldChangeHandler}
        fullWidth
      />
      <TextField
        id='author'
        value={form.author}
        onChange={fieldChangeHandler}
        fullWidth
      />
      <FormControl variant='outlined'>
        <InputLabel id='Genre'>Genre</InputLabel>
        <Select
          labelId='Genre'
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
      <input
        type='file'
        id='image'
        accept='.jpg, .jpeg, .png'
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
        value={form.keywords}
        onChange={fieldChangeHandler}
        fullWidth
      />
      <TextField
        id='releaseYear'
        type='number'
        value={form.releaseYear}
        onChange={fieldChangeHandler}
        fullWidth
      />
      <TextField
        id='price'
        type='number'
        value={form.price}
        onChange={fieldChangeHandler}
        fullWidth
      />
    </form>
  )
}
