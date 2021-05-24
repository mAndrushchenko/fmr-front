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

  const [ author, setAuthor ] = useState<string>('')
  const [ genre, setGenre ] = useState<string>('')
  const [ price, setPrice ] = useState<number[]>([ 20, 80 ])
  const [ searchPhrase, setSearchPhrase ] = useState<string>('')
  const [ year, setYear ] = useState<number>(new Date().getFullYear())

  // const filters = useDebounce({
  //   author,
  //   genre,
  //   price,
  //   searchPhrase,
  //   year
  // }, 1000)

  // counting re-renders
  useEffect(() => {
    console.log('filters re-render')
  })

  // useEffect(() => {
  //   // console for develop
  //   console.log('send request')
  // }, [ filters ])

  const authorHandler = useCallback(
    e => {
      console.log('author changed')
      setAuthor(e.target.value)
    },
    [ ]
  )

  const genreHandler = useCallback(
    e => {
      console.log('genre changed')
      setGenre(e.target.value)
    },
    [ ]
  )

  const searchPhraseHandler = useCallback(
    e => {
      console.log('search changed')
      setSearchPhrase(e.target.value)
    },
    [ ]
  )

  const priceHandler = useCallback(
    (e, value: number | number[]) => {
      console.log('price changed')
      setPrice(value as number[])
    },
    [ ]
  )

  const minPriceHandler = useCallback(
    e => {
      console.log('min price changed')
      setPrice([ +e.target.value, price[1] ])
    },
    [ price ]
  )

  const maxPriceHandler = useCallback(
    e => {
      console.log('max price changed')
      setPrice([ price[0], +e.taget.value ])
    },
    [ price ]
  )

  const yearHandler = useCallback(
    e => {
      console.log('year changed')
      setYear(+e.target.value)
    },
    [ ]
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
            value={author}
            onChange={authorHandler}
          />

          <Genres className={classes.genres} value={genre} setValue={genreHandler} />

          <TextField
            id='searchPhrase'
            label='Search phrase'
            margin='normal'
            variant='outlined'
            className={classes.searchPhrase}
            value={searchPhrase}
            onChange={searchPhraseHandler}
          />

          <TextField
            id='year'
            type='number'
            label='Release year'
            variant='outlined'
            margin='normal'
            className={classes.year}
            value={year}
            onChange={yearHandler}
          />

          <TextField
            id='minPrice'
            label='Min Price'
            variant='outlined'
            margin='normal'
            type='number'
            className={classes.minPriceInput}
            value={price[0]}
            onChange={minPriceHandler}
          />
          <TextField
            id='maxPrice'
            label='Max Price'
            variant='outlined'
            margin='normal'
            type='number'
            className={classes.maxPriceInput}
            value={price[1]}
            onChange={maxPriceHandler}
          />
          <Slider
            className={classes.priceSlider}
            value={price}
            onChange={priceHandler}
            min={0}
            max={100}
          />
        </form>
      </AccordionDetails>
    </Accordion>
  )
}
