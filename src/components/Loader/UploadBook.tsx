import { VFC, useCallback } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { uploadStyles } from './styles'

export const UploadBook: VFC = () => {
  const classes = uploadStyles()

  const bookFile = new FormData()

  const changeHandler = useCallback(e => {
    bookFile.set('book', e.target.files[0])
    console.log(bookFile.get('book'))
  }, [ bookFile ])

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
