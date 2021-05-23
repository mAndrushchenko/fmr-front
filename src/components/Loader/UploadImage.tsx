import { useCallback, VFC } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { TBookImageLoader } from 'src/types/bookLoader'

import { uploadStyles } from './styles'

interface IBookImage {
  handleBookImage: (image: TBookImageLoader) => void
}

export const UploadImage: VFC<IBookImage> = ({ handleBookImage }) => {
  const classes = uploadStyles()

  const changeHandler = useCallback(e => {
    const bookImage = new FormData()
    bookImage.set('image', e.target.files[0])
    handleBookImage(bookImage)
  }, [])

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
