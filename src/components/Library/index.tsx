import React from 'react'
import { useSelector } from 'react-redux'
import { shopSelector } from 'src/store/slices/shopSlice'
import { styles } from './styles'

export const Library = () => {
  const classes = styles()
  const { books } = useSelector(shopSelector)
  return (
    <div className={classes.container}>
      {books.map(book => <div key={book.id}>Book data</div>)}
    </div>
  )
}
