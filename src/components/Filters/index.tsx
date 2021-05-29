import { VFC, useState, useCallback, useEffect } from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMore from '@material-ui/icons/ExpandMore'

import Slider from '@material-ui/core/Slider'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { styles } from './styles'
import { Genres } from '../Genres'
import { getBooksAction } from '../../store/slices/shopSlice'
import { useDispatch } from 'react-redux'
import type { TAppDispatch } from 'src/types/store'

export const Filters: VFC = () => {
  const dispatch = useDispatch<TAppDispatch>()
  const classes = styles()

  const [ author, setAuthor ] = useState<string>('')
  const [ genre, setGenre ] = useState<string>('')
  const [ price, setPrice ] = useState<number[]>([ 20, 80 ])
  const [ searchPhrase, setSearchPhrase ] = useState<string>('')
  const [ year, setYear ] = useState<number>(new Date().getFullYear())

  useEffect(() => {
    const sendTimeout = setTimeout(() => {
      dispatch(getBooksAction({ year, price, searchPhrase, genre, author }))
    }, 500)
    return () => clearTimeout(sendTimeout)
  }, [ author, genre, price, searchPhrase, year ])

  const authorHandler = useCallback(
    e => {
      setAuthor(e.target.value)
    },
    []
  )

  const genreHandler = useCallback(
    e => {
      setGenre(e.target.value)
    },
    []
  )

  const searchPhraseHandler = useCallback(
    e => {
      setSearchPhrase(e.target.value)
    },
    []
  )

  const priceHandler = useCallback(
    (e, value: number | number[]) => {
      if (value) {
        setPrice(value as number[])
      }
    },
    []
  )

  const minPriceHandler = useCallback(
    e => {
      const { value } = e.target
      if (value) {
        setPrice([ +value, price[1] ])
      }
    },
    [ price ]
  )

  const maxPriceHandler = useCallback(
    e => {
      const { value } = e.target
      if (value) {
        setPrice([ price[0], +value ])
      }
    },
    [ price ]
  )

  const yearHandler = useCallback(
    e => {
      setYear(+e.target.value)
    },
    []
  )

  return (
    <Accordion className={classes.root}>
      <AccordionSummary className={classes.title} expandIcon={<ExpandMore />}>
        <Typography variant='h6'>Filters</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form className={classes.form}>
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
