import { VFC, useState, useCallback } from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMore from '@material-ui/icons/ExpandMore'

import Slider from '@material-ui/core/Slider'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

import { styles } from './styles'

export const Filters: VFC = () => {
  const classes = styles()

  const [ filters, setFilters ] = useState({
    author: '',
    genre: '',
    price: [ 20, 80 ],
    searchPhrase: '',
    year: new Date().getFullYear()
  })

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

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant='h6'>Filters</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form>
          <TextField
            id='author'
            label='Author'
            variant='outlined'
            margin='normal'
            value={filters.author}
            onChange={fieldChangeHandler}
          />
          <FormControl
            variant='outlined'
            margin='normal'
          // className={classes.select}
          >
            <InputLabel id='genre-label'>Genre</InputLabel>
            <Select
              labelId='genre-label'
              id='genre'
              label='Genre'
              value={filters.genre}
              onChange={genreChangeHandler}
            >
              <MenuItem value='Detective'>Detective</MenuItem>
              <MenuItem value='Fantastic'>Fantastic</MenuItem>
              <MenuItem value='Psychology'>Psychology</MenuItem>
              <MenuItem value='Roman'>Roman</MenuItem>
              <MenuItem value='Fantasy'>Fantasy</MenuItem>
              <MenuItem value='Business'>Business</MenuItem>
              <MenuItem value='Autobiography'>Autobiography</MenuItem>
              <MenuItem value='Thrillers'>Thrillers</MenuItem>
              <MenuItem value='Horror'>Horror</MenuItem>
              <MenuItem value='Poem'>Poem</MenuItem>
              <MenuItem value='Comics'>Comics</MenuItem>
              <MenuItem value='Memoirs'>Memoirs</MenuItem>
              <MenuItem value='History'>History</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id='searchPhrase'
            label='Search phrase'
            margin='normal'
            variant='outlined'
            value={filters.searchPhrase}
            onChange={fieldChangeHandler}
          />

          <TextField
            id='year'
            type='number'
            label='Release year'
            variant='outlined'
            margin='normal'
            value={filters.year}
            onChange={fieldChangeHandler}
          />

          <TextField
            id='minPrice'
            label='Min Price'
            variant='outlined'
            margin='normal'
            type='number'
            value={filters.price[0]}
            onChange={minPriceHandler}
          />
          <TextField
            id='maxPrice'
            label='Max Price'
            variant='outlined'
            margin='normal'
            type='number'
            value={filters.price[1]}
            onChange={maxPriceHandler}
          />
          <Slider
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
