import { VFC, useState, useCallback, useEffect } from 'react'
import { useDebounce } from 'src/hooks/useDebounce'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMore from '@material-ui/icons/ExpandMore'

import Slider from '@material-ui/core/Slider'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { styles } from './styles'
import { Genres } from '../Genres'

export const Filters: VFC = () => {
  const classes = styles()

  const [ filters, setFilters ] = useState({
    author: '',
    genre: '',
    price: [ 20, 80 ],
    searchPhrase: '',
    year: new Date().getFullYear()
  })

  useEffect(() => {
    // console for develop
    console.log('send request')
  }, [ useDebounce(filters, 1000) ])

  const fieldChangeHandler = useCallback(
    e => {
      setFilters({
        ...filters,
        [e.target.id]: e.target.value
      })
    },
    [ filters ]
  )

  const genreChangeHandler = useCallback(
    e => {
      setFilters({
        ...filters,
        genre: e.target.value
      })
    },
    [ filters ]
  )

  const priceChangeHandler = useCallback(
    (e, value: number | number[]) => {
      setFilters({
        ...filters,
        price: value as number[]
      })
    },
    [ filters ]
  )

  const minPriceHandler = useCallback(
    e => {
      setFilters({
        ...filters,
        price: [ +e.target.value, filters.price[1] ]
      })
    },
    [ filters ]
  )

  const maxPriceHandler = useCallback(
    e => {
      setFilters({
        ...filters,
        price: [ filters.price[0], +e.target.value ]
      })
    },
    [ filters ]
  )

  const yearHandler = useCallback(
    e => {
      setFilters({
        ...filters,
        year: +e.target.value
      })
    },
    [ filters ]
  )

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant='h6'>Filters</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form className={classes.root}>
          <TextField
            id='author'
            label='Author'
            variant='outlined'
            margin='normal'
            className={classes.author}
            value={filters.author}
            onChange={fieldChangeHandler}
          />
          <Genres value={filters.genre} setValue={genreChangeHandler} />

          <TextField
            id='searchPhrase'
            label='Search phrase'
            margin='normal'
            variant='outlined'
            className={classes.searchPhrase}
            value={filters.searchPhrase}
            onChange={fieldChangeHandler}
          />

          <TextField
            id='year'
            type='number'
            label='Release year'
            variant='outlined'
            margin='normal'
            className={classes.year}
            value={filters.year}
            onChange={yearHandler}
          />

          <TextField
            id='minPrice'
            label='Min Price'
            variant='outlined'
            margin='normal'
            type='number'
            className={classes.minPriceInput}
            value={filters.price[0]}
            onChange={minPriceHandler}
          />
          <TextField
            id='maxPrice'
            label='Max Price'
            variant='outlined'
            margin='normal'
            type='number'
            className={classes.maxPriceInput}
            value={filters.price[1]}
            onChange={maxPriceHandler}
          />
          <Slider
            className={classes.priceSlider}
            value={filters.price}
            onChange={priceChangeHandler}
            min={0}
            max={100}
          />
        </form>
      </AccordionDetails>
    </Accordion>
  )
}
