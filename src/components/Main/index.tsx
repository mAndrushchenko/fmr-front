import { VFC } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Card } from '../Card'
import { Header } from '../Header'
import { Signin } from '../Signin'
import { Signup } from '../Signup'

const book = {
  name: 'Sherlock Holmes',
  author: 'Arthut Conan Doyle',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71+WebeovJL.jpg',
  price: '$15.99'
}

export const Main: VFC = () => (
  <main>
    <Router>
      <Header />
      <Switch>
        <Route path='/signin'>
          <Signin />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
      </Switch>
    </Router>
    <Card book={book} />
  </main>
)
