import { VFC } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { TBook } from 'src/types/store'
import { Header } from '../Header'
import { Home } from '../Home'
import { Signin } from '../Signin'
import { Signup } from '../Signup'
import { CardSlider } from '../Slider'

const newBook: TBook[] = [
  {
    id: 9898,
    name: 'dfvdf',
    author: 'dfvdf',
    genre: 'dvdfv',
    image: 'https://upload.wikimedia.org/wikipedia/ru/1/10/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8_%22%D0%9D%D0%B0%D0%B2%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%22%2C_%D0%9C%D0%B0%D0%BA%D1%81_%D0%A4%D1%80%D0%B0%D0%B9.jpg',
    price: 12.99,
    keywords: [ 'ssdc', 'sdc' ],
    releaseYear: 2003
  },
  {
    id: 9898,
    name: 'dfvdf',
    author: 'dfvdf',
    genre: 'dvdfv',
    image: 'https://upload.wikimedia.org/wikipedia/ru/1/10/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8_%22%D0%9D%D0%B0%D0%B2%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%22%2C_%D0%9C%D0%B0%D0%BA%D1%81_%D0%A4%D1%80%D0%B0%D0%B9.jpg',
    price: 12.99,
    keywords: [ 'ssdc', 'sdc' ],
    releaseYear: 2003
  },
  {
    id: 9898,
    name: 'dfvdf',
    author: 'dfvdf',
    genre: 'dvdfv',
    image: 'https://upload.wikimedia.org/wikipedia/ru/1/10/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8_%22%D0%9D%D0%B0%D0%B2%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%22%2C_%D0%9C%D0%B0%D0%BA%D1%81_%D0%A4%D1%80%D0%B0%D0%B9.jpg',
    price: 12.99,
    keywords: [ 'ssdc', 'sdc' ],
    releaseYear: 2003
  },
  {
    id: 9898,
    name: 'dfvdf',
    author: 'dfvdf',
    genre: 'dvdfv',
    image: 'https://upload.wikimedia.org/wikipedia/ru/1/10/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8_%22%D0%9D%D0%B0%D0%B2%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%22%2C_%D0%9C%D0%B0%D0%BA%D1%81_%D0%A4%D1%80%D0%B0%D0%B9.jpg',
    price: 12.99,
    keywords: [ 'ssdc', 'sdc' ],
    releaseYear: 2003
  },
  {
    id: 9898,
    name: 'dfvdf',
    author: 'dfvdf',
    genre: 'dvdfv',
    image: 'https://upload.wikimedia.org/wikipedia/ru/1/10/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8_%22%D0%9D%D0%B0%D0%B2%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%22%2C_%D0%9C%D0%B0%D0%BA%D1%81_%D0%A4%D1%80%D0%B0%D0%B9.jpg',
    price: 12.99,
    keywords: [ 'ssdc', 'sdc' ],
    releaseYear: 2003
  },
  {
    id: 9898,
    name: 'dfvdf',
    author: 'dfvdf',
    genre: 'dvdfv',
    image: 'https://upload.wikimedia.org/wikipedia/ru/1/10/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8_%22%D0%9D%D0%B0%D0%B2%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%22%2C_%D0%9C%D0%B0%D0%BA%D1%81_%D0%A4%D1%80%D0%B0%D0%B9.jpg',
    price: 12.99,
    keywords: [ 'ssdc', 'sdc' ],
    releaseYear: 2003
  },
  {
    id: 9898,
    name: 'dfvdf',
    author: 'dfvdf',
    genre: 'dvdfv',
    image: 'https://upload.wikimedia.org/wikipedia/ru/1/10/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8_%22%D0%9D%D0%B0%D0%B2%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%22%2C_%D0%9C%D0%B0%D0%BA%D1%81_%D0%A4%D1%80%D0%B0%D0%B9.jpg',
    price: 12.99,
    keywords: [ 'ssdc', 'sdc' ],
    releaseYear: 2003
  },
  {
    id: 9898,
    name: 'dfvdf',
    author: 'dfvdf',
    genre: 'dvdfv',
    image: 'https://upload.wikimedia.org/wikipedia/ru/1/10/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8_%22%D0%9D%D0%B0%D0%B2%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%22%2C_%D0%9C%D0%B0%D0%BA%D1%81_%D0%A4%D1%80%D0%B0%D0%B9.jpg',
    price: 12.99,
    keywords: [ 'ssdc', 'sdc' ],
    releaseYear: 2003
  },
  {
    id: 9898,
    name: 'dfvdf',
    author: 'dfvdf',
    genre: 'dvdfv',
    image: 'https://upload.wikimedia.org/wikipedia/ru/1/10/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8_%22%D0%9D%D0%B0%D0%B2%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%22%2C_%D0%9C%D0%B0%D0%BA%D1%81_%D0%A4%D1%80%D0%B0%D0%B9.jpg',
    price: 12.99,
    keywords: [ 'ssdc', 'sdc' ],
    releaseYear: 2003
  },
  {
    id: 9898,
    name: 'dfvdf',
    author: 'dfvdf',
    genre: 'dvdfv',
    image: 'https://upload.wikimedia.org/wikipedia/ru/1/10/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8_%22%D0%9D%D0%B0%D0%B2%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%22%2C_%D0%9C%D0%B0%D0%BA%D1%81_%D0%A4%D1%80%D0%B0%D0%B9.jpg',
    price: 12.99,
    keywords: [ 'ssdc', 'sdc' ],
    releaseYear: 2003
  },
  {
    id: 9898,
    name: 'dfvdf',
    author: 'dfvdf',
    genre: 'dvdfv',
    image: 'https://upload.wikimedia.org/wikipedia/ru/1/10/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8_%22%D0%9D%D0%B0%D0%B2%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%22%2C_%D0%9C%D0%B0%D0%BA%D1%81_%D0%A4%D1%80%D0%B0%D0%B9.jpg',
    price: 12.99,
    keywords: [ 'ssdc', 'sdc' ],
    releaseYear: 2003
  },
  {
    id: 9898,
    name: 'dfvdf',
    author: 'dfvdf',
    genre: 'dvdfv',
    image: 'https://upload.wikimedia.org/wikipedia/ru/1/10/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8_%22%D0%9D%D0%B0%D0%B2%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%22%2C_%D0%9C%D0%B0%D0%BA%D1%81_%D0%A4%D1%80%D0%B0%D0%B9.jpg',
    price: 12.99,
    keywords: [ 'ssdc', 'sdc' ],
    releaseYear: 2003
  },
  {
    id: 9898,
    name: 'dfvdf',
    author: 'dfvdf',
    genre: 'dvdfv',
    image: 'https://upload.wikimedia.org/wikipedia/ru/1/10/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8_%22%D0%9D%D0%B0%D0%B2%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%22%2C_%D0%9C%D0%B0%D0%BA%D1%81_%D0%A4%D1%80%D0%B0%D0%B9.jpg',
    price: 12.99,
    keywords: [ 'ssdc', 'sdc' ],
    releaseYear: 2003
  },
  {
    id: 9898,
    name: 'dfvdf',
    author: 'dfvdf',
    genre: 'dvdfv',
    image: 'https://upload.wikimedia.org/wikipedia/ru/1/10/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8_%22%D0%9D%D0%B0%D0%B2%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%22%2C_%D0%9C%D0%B0%D0%BA%D1%81_%D0%A4%D1%80%D0%B0%D0%B9.jpg',
    price: 12.99,
    keywords: [ 'ssdc', 'sdc' ],
    releaseYear: 2003
  }
]

export const Main: VFC = () => (
  <main>
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/signin'>
          <Signin />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
      </Switch>
    </Router>
    <CardSlider books={newBook} />
  </main>
)
