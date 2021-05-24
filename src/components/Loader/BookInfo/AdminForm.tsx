import React, { VFC, useState, useCallback, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import { Genres } from 'src/components/Genres'

import type { TBookInfoLoader } from 'src/types/bookLoader'
import type { TUploadBook } from 'src/types/store'

const initialBookState: TBookInfoLoader = {
  name: '',
  price: 0,
  genre: '',
  author: '',
  keywords: [],
  description: '',
  releaseYear: new Date().getFullYear()
}

interface IAdminBookInfo {
  handleAdminBookInfo: (info: TUploadBook | null) => void,
}

export const AdminForm: VFC<IAdminBookInfo> = ({ handleAdminBookInfo }) => {
  const [ keywords, setKeywords ] = useState('')
  const [ form, setForm ] = useState(initialBookState)

  const fieldChangeHandler = useCallback(e => {
    setForm(prevFrom => ({ ...prevFrom, [e.target.id]: e.target.value }))
  }, [])

  const keywordsChangeHandler = useCallback(e => {
    const keyString: string = e.target.value
    setKeywords(e.target.value)
    setForm(prevForm => ({
      ...prevForm,
      keywords: keyString.split(',').map(word => word.trim())
    }))
  }, [])

  const genreChangeHandler = useCallback(e => {
    setForm(prevForm => ({ ...prevForm, genre: e.target.value }))
  }, [])

  useEffect(() => {
    handleAdminBookInfo(form)
  }, [ form ])

  return (
    <>
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
      <Genres value={form.genre} setValue={genreChangeHandler} />
      <TextField
        id='description'
        variant='outlined'
        margin='normal'
        label='Description'
        value={form.description}
        onChange={fieldChangeHandler}
        fullWidth
        required
      />
      <TextField
        id='keywords'
        variant='outlined'
        margin='normal'
        label='Keywords'
        value={keywords}
        onChange={keywordsChangeHandler}
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
    </>
  )
}
