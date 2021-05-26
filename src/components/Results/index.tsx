import { VFC } from 'react'
import { TShopBook } from 'src/types/store'
import { Card } from '../Card'
import { Filters } from '../Filters'
import { styles } from './styles'

// next code only for develop
const exampleBook: TShopBook = {
  description: 'Very long description',
  id: 9898,
  name: 'dfvdf',
  author: 'dfvdf',
  genre: 'dvdfv',
  image: 'https://upload.wikimedia.org/wikipedia/ru/1/10/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8_%22%D0%9D%D0%B0%D0%B2%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%22%2C_%D0%9C%D0%B0%D0%BA%D1%81_%D0%A4%D1%80%D0%B0%D0%B9.jpg',
  price: 12.99,
  keywords: [ 'ssdc', 'sdc' ],
  releaseYear: 2003
}
let count = 0
const arrOfBook: TShopBook[] = []
while (count < 15) {
  arrOfBook.push(exampleBook)
  count++
}
// end of develop code

export const Results: VFC = () => {
  const classes = styles()

  return (
    <div className={classes.root}>
      <Filters />
      {arrOfBook.map(book => (
        <div key={book.id} className={classes.item}>
          <Card book={book} />
        </div>
      ))}
    </div>
  )
}
