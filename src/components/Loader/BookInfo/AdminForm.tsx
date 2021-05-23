import React, { VFC, useState, useCallback } from 'react'
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
    const newForm = { ...form, [e.target.id]: e.target.value }
    setForm(newForm)
    handleAdminBookInfo(newForm)
  }, [ form ])

  const keywordsChangeHandler = useCallback(e => {
    const keyString: string = e.target.value
    setKeywords(e.target.value)
    const newForm = {
      ...form,
      keywords: keyString.split(',').map(word => word.trim())
    }
    setForm(newForm)
    handleAdminBookInfo(newForm)
  }, [ form ])

  const genreChangeHandler = useCallback(e => {
    const newForm = { ...form, genre: e.target.value }
    setForm(newForm)
    handleAdminBookInfo(newForm)
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
      <Genres value={form.genre} setValue={genreChangeHandler}/>
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
