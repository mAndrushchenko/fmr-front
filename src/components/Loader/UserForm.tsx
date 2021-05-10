import { VFC, useState, useCallback } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

import { makeStyles } from '@material-ui/core/styles'

const styles = makeStyles({
  fileUpload: {
    display: 'none'
  }
})

export const UserForm: VFC = () => {
  const classes = styles()

  const [ form, setForm ] = useState({
    name: '',
    image: '',
    author: '',
    genre: ''
  })

  const fieldChangeHandler = useCallback(
    e => {
      setForm({
        ...form,
        [e.target.id || 'genre']: e.target.value
      })
    },
    [ form ]
  )

  return (
    <form>
      <TextField id='name' value={form.name} onChange={fieldChangeHandler} />
      <TextField
        id='author'
        value={form.author}
        onChange={fieldChangeHandler}
      />
      <FormControl variant='outlined'>
        <InputLabel id='Genre'>Genre</InputLabel>
        <Select
          labelId='Genre'
          id='genre'
          value={form.genre}
          onChange={fieldChangeHandler}
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
        onChange={e => console.log(e.target.value)}
      />
      <label htmlFor='image'>
        <Button component='span'>Upload image</Button>
      </label>
    </form>
  )
}
