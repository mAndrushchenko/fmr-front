import { useCallback, VFC } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { uploadStyles } from './styles'

export const UploadImage: VFC = () => {
  const classes = uploadStyles()

  const bookImage = new FormData()

  const changeHandler = useCallback(e => {
    bookImage.set('image', e.target.files[0])
    console.log(bookImage.get('image'))
  }, [ bookImage ])

  return (
    <>
      <TextField
        id='image'
        type='file'
        className={classes.input}
        onChange={changeHandler}
        inputProps={{
          accept: '.jpg, .png, .jpeg'
        }}
      />
      <label htmlFor='image'>
        <Button color='primary' variant='outlined' component='span'>
          Upload image
        </Button>
      </label>
    </>
  )
}
