import { VFC, useCallback } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import type { TBookDataLoader } from 'src/types/bookLoader'

import { uploadStyles } from './styles'

interface IBookData {
  handleBookData: (data: TBookDataLoader) => void
}

export const UploadBook: VFC<IBookData> = ({ handleBookData }) => {
  const classes = uploadStyles()

  const changeHandler = useCallback(e => {
    const bookData = new FormData()
    bookData.set('book', e.target.files[0])
    handleBookData(bookData)
  }, [])

  return (
    <>
      <TextField
        id='book'
        type='file'
        inputProps={{
          accept: '.fb2, .txt, .docx, .epub'
        }}
        className={classes.input}
        onChange={changeHandler}
      />
      <label htmlFor='book'>
        <Button
          component='span'
          variant='outlined'
          color='primary'
        >
          Upload book
        </Button>
      </label>
    </>
  )
}
