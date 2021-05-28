import { VFC } from 'react'
import { TShopBook } from 'src/types/store'
import { Card } from '../Card'
import { Filters } from '../Filters'
import { styles } from './styles'

export const Results: VFC = () => {
  const classes = styles()

  return (
    <div className={classes.root}>
      <Filters />
      {/* map TShopBook array */}
    </div>
  )
}
